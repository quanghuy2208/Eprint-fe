import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Select, Space } from 'antd';
import { FolderAddOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/index';
import InputComponent from '../InputComponent/index';
import DrawerComponent from '../DrawerComponent/index';
import * as CollectionService from '../../services/CollectionService.js';
import { getBase64, renderOptions } from '../../utils/router';
import { WrapperUploadFile } from './style.js';
import axios from 'axios';
import ModalComponent from '../ModalComponent/index.js';
import { generateSlug } from '../../utils/index.js';
import { axiosJWT } from '../../services/UserService.js';

const AdminCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeCollections, setTypeCollections] = useState([]);
  
  const initial = () => ({
    typeName: '',
    typeSlug: '',
    newType: '',
    fileName: '',
    fileLink: '',
  });

  const [stateCollection, setStateCollection] = useState(initial());
  const [stateCollectionDetails, setStateCollectionDetails] = useState(initial());
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const searchInput = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const createCollection = async () => {
    try {
      const fileInput = document.getElementById('file-pdf');
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'file');

      const dataRes = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData);
      const downloadURL = dataRes.data?.downloadURL;

      const dataCollection = {
        typeName: stateCollection.typeName === 'add_type' ? stateCollection.newType : stateCollection.typeName,
        fileName: file.name?.split('.')[0],
        fileLink: downloadURL,
      };
      
      const typeSlug = generateSlug(dataCollection.typeName);
      dataCollection.typeSlug = typeSlug;

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/collection/create`, dataCollection);

      if (res.data.status === 'OK') {
        handleCancel();
        fetchData();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error occurred while creating collection:', error);
    }
  };

  const deleteCollection = async () => {
    try {
      const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/collection/delete/${rowSelected}`, {});
      if (res.data.status === 'OK') {
        handleCancelDelete();
        fetchData();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error occurred while deleting collection:', error);
    }
  };

  const onDelete = () => {
    deleteCollection();
  };

  const updateCollection = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/collection/update/${rowSelected}`, {
        typeName: stateCollectionDetails.typeName,
        pdf: stateCollectionDetails.pdf,
      });

      if (res.data.status === 'OK') {
        handleCloseDrawer();
        fetchData();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error occurred while updating collection:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Chỉ cần gọi fetchData một lần khi component được mount

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateCollectionDetails);
    } else {
      form.setFieldsValue(initial());
    }
  }, [form, stateCollectionDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsCollection(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]); // Đã thêm rowSelected và isOpenDrawer vào dependency array

  useEffect(() => {
    fetchAllTypeCollection();
  }, []); // Chỉ cần gọi fetchAllTypeCollection một lần khi component được mount

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/collection/get-all`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchGetDetailsCollection = async (rowSelected) => { // Thêm tham số rowSelected vào hàm
    const res = await CollectionService.getDetailsCollection(rowSelected);
    if (res?.data) {
      setStateCollectionDetails({
        typeName: res.data.typeName,
        fileName: res.data.fileName,
      });
    }
  };

  const fetchAllTypeCollection = async () => {
    const res = await CollectionService.getAllTypeCollection();
    if (res?.status === 'OK') {
      setTypeCollections(res.data);
    }
  };

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: 'red', fontSize: '3rem', cursor: 'pointer' }}
          onClick={() => {
            setIsModalOpenDelete(true);
          }}
        />
        <EditOutlined
          style={{ color: 'orange', fontSize: '3rem', cursor: 'pointer' }}
          onClick={() => {
            setIsOpenDrawer(true);
          }}
        />
      </div>
    );
  };

  const handleCancel = () => {
    setStateCollection(initial()); // Sử dụng hàm initial() để reset
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCloseDrawer = () => {
    setStateCollectionDetails(initial()); // Sử dụng hàm initial() để reset
    setIsOpenDrawer(false);
    form.resetFields();
  };

  const handleOnchange = e => {
    setStateCollection({
      ...stateCollection,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = e => {
    setStateCollectionDetails({
      ...stateCollectionDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateCollectionDetails({
      ...stateCollectionDetails,
      pdf: file.preview,
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = clearFilters => {
    clearFilters();
  };

  const handleChangeSelect = value => {
    setStateCollection({
      ...stateCollection,
      typeName: value,
    });
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={e => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'Thể loại bộ sưu tập',
      dataIndex: 'typeName',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('typeName'),
    },
    {
      title: 'Tập tin pdf',
      dataIndex: 'fileName',
    },
    {
      title: 'Hành động',
      render: (text, record) => renderAction(record),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        icon={<FolderAddOutlined />}
        style={{
          marginBottom: 16,
        }}>
        Thêm mới
      </Button>

      <TableComponent dataSource={data} columns={columns} />

      <ModalComponent
        isOpen={isModalOpen}
        title="Thêm mới bộ sưu tập"
        onCancel={handleCancel}
        onOk={createCollection}
        okText="Thêm mới"
        cancelText="Hủy"
      >
        <WrapperUploadFile>
          <Form form={form} layout="vertical">
            <Form.Item label="Chọn thể loại">
              <Select defaultValue="add_type" onChange={handleChangeSelect}>
                <Select.Option value="add_type">Thêm thể loại mới</Select.Option>
                {typeCollections.length > 0 && renderOptions(typeCollections)}
              </Select>
            </Form.Item>
            {stateCollection.typeName === 'add_type' && (
              <Form.Item label="Tên thể loại" name="newType" required>
                <InputComponent onChange={handleOnchange} name="newType" />
              </Form.Item>
            )}
            <Form.Item label="Chọn tệp PDF" required>
              <input type="file" id="file-pdf" />
            </Form.Item>
          </Form>
        </WrapperUploadFile>
      </ModalComponent>

      <DrawerComponent
        title="Cập nhật bộ sưu tập"
        width={720}
        onClose={handleCloseDrawer}
        visible={isOpenDrawer}>
        <WrapperUploadFile>
          <Form form={form} layout="vertical">
            <Form.Item label="Tên thể loại" name="typeName" required>
              <InputComponent onChange={handleOnchangeDetails} name="typeName" />
            </Form.Item>
            <Form.Item label="Tập tin PDF">
              <InputComponent
                value={stateCollectionDetails.fileName}
                disabled
              />
            </Form.Item>
            <Form.Item label="Hình ảnh" required>
              <InputComponent onChange={handleOnchangeAvatarDetails} />
            </Form.Item>
          </Form>
        </WrapperUploadFile>
        <Button type="primary" onClick={updateCollection}>
          Cập nhật
        </Button>
      </DrawerComponent>

      <ModalComponent
        isOpen={isModalOpenDelete}
        title="Xóa bộ sưu tập"
        onCancel={handleCancelDelete}
        onOk={onDelete}
        okText="Xóa"
        cancelText="Hủy">
        <p>Bạn có chắc chắn muốn xóa bộ sưu tập này không?</p>
      </ModalComponent>
    </>
  );
};

export default AdminCollection;

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
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeCollections, setTypeCollections] = useState([]);
  
  const inittial = () => ({
    typeName: '',
    typeSlug: '',
    newType: '',
    fileName: '',
    fileLink: '',
  });

  const [stateCollection, setStateCollection] = useState(inittial());
  const [stateCollectionDetails, setStateCollectionDetails] = useState(inittial());
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

  // const updateCollection = async () => {
  //   try {
  //     const res = await axios.put(`${process.env.REACT_APP_API_URL}/collection/update/${rowSelected}`, {
  //       typeName: stateCollectionDetails.typeName,
  //       pdf: stateCollectionDetails.pdf,
  //     });

  //     if (res.data.status === 'OK') {
  //       handleCloseDrawer();
  //       fetchData();
  //     } else {
  //       alert(res.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error occurred while updating collection:', error);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []); // Đây là ổn nếu fetchData không phụ thuộc vào state khác.

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateCollectionDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateCollectionDetails, isModalOpen]); // Cần kiểm tra xem form có cần cập nhật gì khác không.

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsCollection(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]); // Kiểm tra các dependency có cần thiết không.

  useEffect(() => {
    fetchAllTypeCollection();
  }, []); // Ổn nếu fetchAllTypeCollection không phụ thuộc vào state khác.

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/collection/get-all`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchGetDetailsCollection = async () => {
    const res = await CollectionService.getDetailsCollection(rowSelected);
    if (res?.data) {
      setStateCollectionDetails({
        typeName: res?.data?.typeName,
        fileName: res?.data?.fileName,
      });
    }
  };

  const fetchAllTypeCollection = async () => {
    const res = await CollectionService.getAllTypeCollection();
    if (res?.status === 'OK') {
      setTypeCollections(res?.data);
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
    setStateCollection({
      typeName: '',
      pdf: '',
    });
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCloseDrawer = () => {
    setStateCollectionDetails({
      typeName: '',
      pdf: '',
    });
    setIsOpenDrawer(false);
    form.resetFields();
  };

  // const handleOnchange = e => {
  //   setStateCollection({
  //     ...stateCollection,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleOnchangeDetails = e => {
  //   setStateCollectionDetails({
  //     ...stateCollectionDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

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
      title: 'Action',
      render: (_, record) => (
        <span>
          {renderAction()}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<FolderAddOutlined />}
        onClick={showModal}>
        Thêm mới bộ sưu tập
      </Button>
      <TableComponent dataSource={data} columns={columns} onSelect={setRowSelected} />
      <ModalComponent
        title="Thêm mới bộ sưu tập"
        open={isModalOpen}
        onOk={createCollection}
        onCancel={handleCancel}>
        <WrapperUploadFile>
          <Form form={form}>
            <Form.Item
              label="Thể loại"
              name="typeName"
              rules={[{ required: true, message: 'Please input your type!' }]}>
              <Select onChange={handleChangeSelect}>
                {renderOptions(typeCollections)}
              </Select>
            </Form.Item>
            <Form.Item
              label="Tập tin"
              name="pdf"
              rules={[{ required: true, message: 'Please input your file!' }]}>
              <input type="file" id="file-pdf" />
            </Form.Item>
          </Form>
        </WrapperUploadFile>
      </ModalComponent>
      <ModalComponent
        title="Xác nhận xóa"
        open={isModalOpenDelete}
        onOk={onDelete}
        onCancel={handleCancelDelete}>
        <p>Bạn có chắc chắn muốn xóa?</p>
      </ModalComponent>
      <DrawerComponent
        title="Sửa bộ sưu tập"
        width={720}
        onClose={handleCloseDrawer}
        open={isOpenDrawer}
        bodyStyle={{ paddingBottom: 80 }}>
        <WrapperUploadFile>
          <Form form={form}>
            <Form.Item
              label="Thể loại"
              name="typeName"
              rules={[{ required: true, message: 'Please input your type!' }]}>
              <Select defaultValue={stateCollectionDetails.typeName} onChange={handleChangeSelect}>
                {renderOptions(typeCollections)}
              </Select>
            </Form.Item>
            <Form.Item
              label="Tập tin"
              name="pdf"
              rules={[{ required: true, message: 'Please input your file!' }]}>
              <input type="file" onChange={handleOnchangeAvatarDetails} />
              {stateCollectionDetails.pdf && (
                <img src={stateCollectionDetails.pdf} alt="File preview" style={{ width: '100%', marginTop: '10px' }} />
              )}
            </Form.Item>
          </Form>
        </WrapperUploadFile>
      </DrawerComponent>
    </div>
  );
};

export default AdminCollection;

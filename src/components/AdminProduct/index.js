import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Select, Space } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/index';
import InputComponent from '../InputComponent/index';
import DrawerComponent from '../DrawerComponent/index';
import * as ProductService from '../../services/ProductService';
import { getBase64, renderOptions } from '../../utils/router';
import { WrapperUploadFile } from './style.js';
import axios from 'axios';
import ModalComponent from '../ModalComponent/index.js';
import { axiosJWT } from '../../services/UserService.js';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeProducts, setTypeProducts] = useState([]);
  const inittial = () => ({
    name: '',
    type: '',
    price: '',
    description: '',
    image: '',
    newType: '',
  });
  const [stateProduct, setStateProduct] = useState(inittial());
  const [stateProductDetails, setStateProductDetails] = useState(inittial());
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const searchInput = useRef(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const createProduct = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, {
        name: stateProduct.name,
        type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
        price: stateProduct.price,
        description: stateProduct.description,
        image: stateProduct.image,
      });

      if (res.data.status === 'OK') {
        handleCancel();
        fetchData();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error occurred while signing in:', error);
    }
  };
  const onDelete = () => {
    deleteProduct();
  };
  const updateProduct = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/product/update/${rowSelected}`, {
        name: stateProductDetails.name,
        type: stateProductDetails.type,
        price: stateProductDetails.price,
        description: stateProductDetails.description,
        image: stateProductDetails.image,
      });

      if (res.data.status === 'OK') {
        handleCloseDrawer();
        fetchData();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error occurred while signing in:', error);
    }
  };
  const deleteProduct = async () => {
    try {
      const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${rowSelected}`, {});
      if (res.data.status === 'OK') {
        handleCancelDelete();
        fetchData();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error occurred while signing in:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        type: res?.data?.type,
        price: res?.data?.price,
        description: res?.data?.description,
        image: res?.data?.image,
      });
    }
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === 'OK') {
      setTypeProducts(res?.data);
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
    setStateProduct({
      name: '',
      type: '',
      price: '',
      description: '',
      image: '',
    });
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCloseDrawer = () => {
    setStateProductDetails({
      name: '',
      type: '',
      price: '',
      description: '',
      image: '',
    });
    setIsOpenDrawer(false);
    form.resetFields();
  };

  const handleOnchange = e => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = e => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = clearFilters => {
    clearFilters();
  };
  const handleChangeSelect = value => {
    setStateProduct({
      ...stateProduct,
      type: value,
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
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];
  return (
    <>
      <h1>Quản lý sản phẩm</h1>
      <div style={{ marginTop: '20px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}>
          <AppstoreAddOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent
          columns={columns}
          data={data}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="createProductForm"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            width: '100%',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
          autoComplete="on"
          form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your product name!',
              },
            ]}>
            <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please input your product type!',
              },
            ]}>
            <Select name="type" value={stateProduct.type} onChange={handleChangeSelect} options={renderOptions(typeProducts)} />
          </Form.Item>
          {stateProduct.type === 'add_type' && (
            <Form.Item label="New type" name="newType" rules={[{ required: true, message: 'Please input your type!' }]}>
              <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
            </Form.Item>
          )}
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input your product price!',
              },
            ]}>
            <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your product pescription!',
              },
            ]}>
            <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input your Product Image!',
              },
            ]}>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button>Select File</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image}
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px',
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}>
            <Button type="primary" htmlType="submit" onClick={createProduct}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
      <DrawerComponent title="Chi tiết sản phẩm" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Form
          name="updateProductForm"
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 22,
          }}
          style={{
            width: '100%',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
          autoComplete="on"
          form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your product name!',
              },
            ]}>
            <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please input your product type!',
              },
            ]}>
            <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input your product price!',
              },
            ]}>
            <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your product pescription!',
              },
            ]}>
            <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input your Product Image!',
              },
            ]}>
            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
              <Button>Select File</Button>
              {stateProductDetails?.image && (
                <img
                  src={stateProductDetails?.image}
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px',
                  }}
                  alt="avatar"
                />
              )}
            </WrapperUploadFile>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}>
            <Button type="primary" htmlType="submit" onClick={updateProduct}>
              Apply
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={onDelete}>
        <div>Bạn có chắc chắn muốn xóa sản phẩm này không ?</div>
      </ModalComponent>
    </>
  );
};
export default AdminProduct;

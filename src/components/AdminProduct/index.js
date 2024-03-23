import { Button, Form, Modal } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/index';
import React, { useState } from 'react';
import InputComponent from '../InputComponent/index';
import { getBase64 } from '../../utils/router';
import { WrapperUploadFile } from './style.js';
import axios from 'axios';

const AdminProduct = () => {
  const onFinish = () => {
    createProduct();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [form] = Form.useForm();
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

  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    image: '',
  });
  const createProduct = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/product/create', {
        name: stateProduct.name,
        type: stateProduct.type,
        price: stateProduct.price,
        description: stateProduct.description,
        image: stateProduct.image,
      });
      console.log('🚀 ~ createProduct ~ res:', res);

      if (res.data.status === 'OK') {
        handleCancel();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error occurred while signing in:', error);
    }
  };
  const handleOnchange = e => {
    setStateProduct({
      ...stateProduct,
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
  return (
    <>
      <h1>Quản lý sản phẩm</h1>
      <div style={{ marginTop: '20px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}>
          <AppstoreAddOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="basic"
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
          onFinish={onFinish}
          autoComplete="on"
          form={form}>
          <Form.Item
            label="Name"
            name="Name"
            rules={[
              {
                required: true,
                message: 'Please input your product name!',
              },
            ]}>
            <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="Type"
            rules={[
              {
                required: true,
                message: 'Please input your product type!',
              },
            ]}>
            <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="Price"
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
            name="Description"
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
            name="Image"
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AdminProduct;

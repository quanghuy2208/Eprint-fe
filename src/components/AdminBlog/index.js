import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Select, Space } from 'antd';
import { DiffOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/index';
import InputComponent from '../InputComponent/index';
import DrawerComponent from '../DrawerComponent/index';
import * as BlogService from '../../services/BlogService.js';
import { getBase64, renderOptions } from '../../utils/router';
import { WrapperUploadFile } from './style.js';
import axios from 'axios';
import ModalComponent from '../ModalComponent/index.js';
import { generateSlug } from '../../utils/index.js';
import { axiosJWT } from '../../services/UserService.js';
const AdminBlog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeBlogs, setTypeBlogs] = useState([]);
  const inittial = () => ({
    title: '',
    author: '',
    typeName: '',
    newType: '',
    content: '',
    image: '',
    typeSlug: '',
  });
  const [stateBlog, setStateBlog] = useState(inittial());
  const [stateBlogDetails, setStateBlogDetails] = useState(inittial());
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const searchInput = useRef(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const createBlog = async () => {
    try {
      const dataBlog = {
        title: stateBlog.title,
        typeName: stateBlog.typeName === 'add_type' ? stateBlog.newType : stateBlog.typeName,
        author: stateBlog.author,
        content: stateBlog.content,
        image: stateBlog.image,
      };
      const typeSlug = generateSlug(dataBlog.typeName);
      dataBlog.typeSlug = typeSlug;

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/blog/create`, dataBlog);

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
  const deleteBlog = async () => {
    try {
      const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/blog/delete/${rowSelected}`, {});
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
  const onDelete = () => {
    deleteBlog();
  };
  const updateBlog = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/blog/update/${rowSelected}`, {
        title: stateBlogDetails.title,
        typeName: stateBlogDetails.typeName,
        author: stateBlogDetails.author,
        content: stateBlogDetails.content,
        image: stateBlogDetails.image,
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
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateBlogDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateBlogDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsBlog(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  useEffect(() => {
    fetchAllTypeBlog();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blog/get-all`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchGetDetailsBlog = async () => {
    const res = await BlogService.getDetailsBlog(rowSelected);
    if (res?.data) {
      setStateBlogDetails({
        title: res?.data?.title,
        typeName: res?.data?.typeName,
        author: res?.data?.author,
        content: res?.data?.content,
        image: res?.data?.image,
      });
    }
  };
  const fetchAllTypeBlog = async () => {
    const res = await BlogService.getAllTypeBlog();
    if (res?.status === 'OK') {
      setTypeBlogs(res?.data);
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
    setStateBlog({
      title: '',
      typeName: '',
      author: '',
      content: '',
      image: '',
    });
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCloseDrawer = () => {
    setStateBlogDetails({
      title: '',
      typeName: '',
      author: '',
      content: '',
      image: '',
    });
    setIsOpenDrawer(false);
    form.resetFields();
  };
  const handleOnchange = e => {
    setStateBlog({
      ...stateBlog,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = e => {
    setStateBlogDetails({
      ...stateBlogDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateBlog({
      ...stateBlog,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateBlogDetails({
      ...stateBlogDetails,
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
    setStateBlog({
      ...stateBlog,
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
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Type',
      dataIndex: 'typeName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];
  return (
    <>
      <h1>Quản lý bài viết </h1>
      <div style={{ marginTop: '20px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}>
          <DiffOutlined style={{ fontSize: '60px' }} />
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
      <ModalComponent title="Đăng bài viết" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="createBlogForm"
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
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your Blog title!',
              },
            ]}>
            <InputComponent value={stateBlog['title']} onChange={handleOnchange} name="title" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="typeName"
            rules={[
              {
                required: true,
                message: 'Please input your Blog type!',
              },
            ]}>
            <Select name="typeName" value={stateBlog.typeName} onChange={handleChangeSelect} options={renderOptions(typeBlogs)} />
          </Form.Item>
          {stateBlog.typeName === 'add_type' && (
            <Form.Item label="New type" name="newType" rules={[{ required: true, message: 'Please input your type!' }]}>
              <InputComponent value={stateBlog.newType} onChange={handleOnchange} name="newType" />
            </Form.Item>
          )}
          <Form.Item
            label="Author"
            name="author"
            rules={[
              {
                required: true,
                message: 'Please input your blog author!',
              },
            ]}>
            <InputComponent value={stateBlog.author} onChange={handleOnchange} name="author" />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please input your blog content!',
              },
            ]}>
            <InputComponent value={stateBlog.content} onChange={handleOnchange} name="content" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input your Blog Image!',
              },
            ]}>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button>Select File</Button>
              {stateBlog?.image && (
                <img
                  src={stateBlog?.image}
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
            <Button type="primary" htmlType="submit" onClick={createBlog}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
      <DrawerComponent title="Chi tiết bài viết" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Form
          name="updateBlogForm"
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
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your blog title!',
              },
            ]}>
            <InputComponent value={stateBlogDetails['title']} onChange={handleOnchangeDetails} name="title" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="typeName"
            rules={[
              {
                required: true,
                message: 'Please input your blog type!',
              },
            ]}>
            <InputComponent value={stateBlogDetails['typeName']} onChange={handleOnchangeDetails} name="typeName" />
          </Form.Item>
          <Form.Item
            label="Author"
            name="author"
            rules={[
              {
                required: true,
                message: 'Please input your blog author!',
              },
            ]}>
            <InputComponent value={stateBlogDetails.author} onChange={handleOnchangeDetails} name="author" />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please input your blog content!',
              },
            ]}>
            <InputComponent value={stateBlogDetails.content} onChange={handleOnchangeDetails} name="content" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input your Blog Image!',
              },
            ]}>
            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
              <Button>Select File</Button>
              {stateBlogDetails?.image && (
                <img
                  src={stateBlogDetails?.image}
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
            <Button type="primary" htmlType="submit" onClick={updateBlog}>
              Apply
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={onDelete}>
        <div>Bạn có chắc chắn muốn xóa bài viết này không ?</div>
      </ModalComponent>
    </>
  );
};
export default AdminBlog;

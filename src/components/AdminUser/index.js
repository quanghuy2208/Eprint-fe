import { Button, Form } from 'antd';
import { UserAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './style.js';
import TableComponent from '../TableComponent';
import InputComponent from '../InputComponent';
import DrawerComponent from '../DrawerComponent';
import { WrapperUploadFile } from '../AdminUser/style';
import ModalComponent from '../ModalComponent/index.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosJWT } from '../../services/UserService.js';
import { getBase64 } from '../../utils/router.js';
import * as UserService from '../../services/UserService';

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const inittial = () => ({
    name: '',
    email: '',
    password: '',
    image: '',
  });
  const [stateUser, setStateUser] = useState(inittial());
  const [stateUserDetails, setStateUserDetails] = useState(inittial());
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const createUser = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/api/user/sign-up`, {
        name: stateUser.name,
        email: stateUser.email,
        password: stateUser.password,
        image: stateUser.image,
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
  const onFinish = () => {
    createUser();
  };
  const onUpdate = () => {
    updateUser();
  };
  const onDelete = () => {
    deleteUser();
  };
  const updateUser = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/user/update-user/${rowSelected}`, {
        name: stateUserDetails.name,
        type: stateUserDetails.type,
        price: stateUserDetails.price,
        description: stateUserDetails.description,
        image: stateUserDetails.image,
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
  const deleteUser = async () => {
    try {
      const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${rowSelected}`, {});
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
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateUserDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateUserDetails, isModalOpen]);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/user/getAll');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchGetDetailsUser = async () => {
    const res = await UserService.getDetailsUser(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        password: res?.data?.password,
        image: res?.data?.image,
      });
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
    setStateUser({
      name: '',
      email: '',
      password: '',
      image: '',
    });
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCloseDrawer = () => {
    setStateUserDetails({
      name: '',
      email: '',
      password: '',
      image: '',
    });
    setIsOpenDrawer(false);
    form.resetFields();
  };

  const handleOnchange = e => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = e => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      image: file.preview,
    });
  };
  const handleDetailsUser = () => {
    if (rowSelected) {
      fetchGetDetailsUser();
    }
    setIsOpenDrawer(true);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];
  return (
    <>
      <h1>Quản lý người dùng</h1>
      {/* <div style={{ marginTop: '20px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}>
          <UserAddOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div> */}
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
      {/* <ModalComponent title="Tạo người dùng" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="createUserForm"
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
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your User name!',
              },
            ]}>
            <InputComponent value={stateUser['name']} onChange={handleOnchange} name="name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your User type!',
              },
            ]}>
            <InputComponent value={stateUser.email} onChange={handleOnchange} name="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your User password!',
              },
            ]}>
            <InputComponent value={stateUser.password} onChange={handleOnchange} name="password" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input your User Image!',
              },
            ]}>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button>Select File</Button>
              {stateUser?.image && (
                <img
                  src={stateUser?.image}
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
      </ModalComponent> */}
      <DrawerComponent title="Cập nhật thông tin người dùng" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Form
          name="updateUserForm"
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
          onFinish={onUpdate}
          autoComplete="on"
          form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your User name!',
              },
            ]}>
            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your User email!',
              },
            ]}>
            <InputComponent value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your User password!',
              },
            ]}>
            <InputComponent value={stateUserDetails.password} onChange={handleOnchangeDetails} name="password" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input your User Image!',
              },
            ]}>
            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
              <Button>Select File</Button>
              {stateUserDetails?.image && (
                <img
                  src={stateUserDetails?.image}
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
              Apply
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
      <ModalComponent title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={onDelete}>
        <div>Bạn có chắc chắn muốn xóa người dùng này không ?</div>
      </ModalComponent>
    </>
  );
};
export default AdminUser;

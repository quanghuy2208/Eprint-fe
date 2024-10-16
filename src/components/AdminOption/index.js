import { Button, Form, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
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

  const onUpdate = () => {
    updateUser();
  };
  const onDelete = () => {
    deleteUser();
  };
  const updateUser = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user/${rowSelected}`, {
        name: stateUserDetails.name,
        email: stateUserDetails.email,
        password: stateUserDetails.password,
        isAdmin: stateUserDetails.isAdmin,
        avatar: stateUserDetails.avatar,
      });

      console.log('🚀 ~ updateUser ~ res:', res);
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`);
      console.log(response)
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
        avatar: res?.data?.avatar,
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
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleCloseDrawer = () => {
    setStateUserDetails({
      name: '',
      email: '',
      password: '',
      avatar: '',
    });
    setIsOpenDrawer(false);
    form.resetFields();
  };

  const handleOnchangeDetails = e => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };
  const columns = [
    {
      title: 'Tên Option sản phẩm',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Danh sách kiểu sản phẩm',
      dataIndex: 'email',
    },
    {
      title: 'Danh sách kích thước',
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
      <h1>Quản lý option sản phẩm</h1>
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
      <DrawerComponent title="Cập nhật Option sản phẩm" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
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
            label="Tên Option"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your option name!',
              },
            ]}>
            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
          </Form.Item>

          <Form.Item
            label="Danh sách tùy chọn"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your User email!',
              },
            ]}>
            <Select value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="email" />
          </Form.Item>
          <Form.Item
            label="Danh sách kích thước"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your User password!',
              },
            ]}>
            <Select value={stateUserDetails.password} onChange={handleOnchangeDetails} name="password" />
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

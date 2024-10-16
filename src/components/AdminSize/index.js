import { Button, Form, Select } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './style.js';
import TableComponent from '../TableComponent';
import InputComponent from '../InputComponent';
import DrawerComponent from '../DrawerComponent';
import ModalComponent from '../ModalComponent/index.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosJWT } from '../../services/UserService.js';
import * as UserService from '../../services/UserService';

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const inittial = () => ({
    name: '',
    size: '',
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
        size: stateUserDetails.size,
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
      const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/size/delete-size/${rowSelected}`, {});
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/size/getallSize`);
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
        size: res?.data?.size,
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
      size: '',
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

  const columns = [
    {
      title: 'Tên kích thước',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Kích thước',
      dataIndex: 'size',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];
  return (
    <>
      <h1>Quản lý kích thước</h1>
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
            label="Tên kích thước"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input name size!',
              },
            ]}>
            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
          </Form.Item>

          <Form.Item
            label="kích thước"
            name="size"
            rules={[
              {
                required: true,
                message: 'Please input size!',
              },
            ]}>
            <InputComponent value={stateUserDetails['size']} onChange={handleOnchangeDetails} name="size" />
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
      <ModalComponent title="Xóa Kích thước" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={onDelete}>
        <div>Bạn có chắc chắn muốn xóa kích thước dùng này không ?</div>
      </ModalComponent>
    </>
  );
};
export default AdminUser;

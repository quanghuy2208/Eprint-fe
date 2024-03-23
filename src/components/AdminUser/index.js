import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import './style.scss';
import TableComponent from '../TableComponent';

const AdminUser = () => {
  return (
    <>
      <h1>Quản lý người dùng</h1>
      <div style={{ marginTop: '20px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}>
          <UserAddOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent />
      </div>
    </>
  );
};
export default AdminUser;

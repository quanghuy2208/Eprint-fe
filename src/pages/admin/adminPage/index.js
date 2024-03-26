import { Menu } from 'antd';
import { SnippetsOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import AdminUser from '../../../components/AdminUser/index';
import AdminProduct from '../../../components/AdminProduct/index';
const AdminPage = () => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [getItem('Người dùng', 'users', <UserOutlined />), getItem('Sản phẩm', 'products', <ProductOutlined />), getItem('Bài viết', 'blog', <SnippetsOutlined />)];
  const [keySelected, setKeySelected] = useState();
  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };
  const renderPage = key => {
    switch (key) {
      case 'users':
        return <AdminUser />;
      case 'products':
        return <AdminProduct />;
      default:
        return <></>;
    }
  };
  return (
    <div style={{ display: 'flex', overflowX: 'hidden' }}>
      <Menu
        mode="inline"
        style={{
          width: 256,
          boxShadow: '1px 1px 2px #ccc',
        }}
        items={items}
        onClick={handleOnCLick}
      />
      <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>{renderPage(keySelected)}</div>
    </div>
  );
};
export default AdminPage;

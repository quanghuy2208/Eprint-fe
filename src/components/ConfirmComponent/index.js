import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';

const ConfirmComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) => {
  return (
    <>
      <Confirm title={title} placement={placement} open={isOpen} {...rests}>
        {children}
      </Confirm>
    </>
  );
};

export default ConfirmComponent;

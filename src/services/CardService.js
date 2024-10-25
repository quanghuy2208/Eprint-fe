import axios from 'axios';
import { axiosJWT } from './UserService';

export const getCartItems = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/cards/getAllCards`);
  return res.data;
};

export const updateCartItem = async (cartId, productId, quantity) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/cards/updateCard/${cartId}`, { 
      productId, 
      quantity 
    });
    return res.data;
  };
  
  export const deleteCartItem = async (cartId, productId) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/cards/deleteCard/${cartId}`, {
        params: {
          productId: productId
        }
      });
      return res.data;
    } catch (error) {
      console.error('Lỗi khi xóa mặt hàng trong giỏ:', error);
      throw error;
    }
  };


export const addToCard = async (user_id, productId, quantity, products_name, products_image, products_price) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/cards/addToCard`, {user_id, productId, quantity, products_name, products_image, products_price});
  return res.data;
};

// Làm rỗng giỏ hàng
export const clearCart = async () => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/clear`);
  return res.data;
};

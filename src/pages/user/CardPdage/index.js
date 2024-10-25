import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as CartService from '../../../services/CardService';
import './style.scss';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    const res = await CartService.getCartItems();
    if (res?.status === 'OK') {
      setCartItems(res.data);
    }
  };

  const updateQuantity = async (cartId, productId, quantity) => {
    if (quantity === 0) {
      await CartService.deleteCartItem(cartId, productId);
      getCartItems();
      return;
    }
    
    if (quantity < 0) return;
    
    await CartService.updateCartItem(cartId, productId, quantity);
    getCartItems();
  };


  useEffect(() => {
    getCartItems();
    window.scrollTo(0, 0);
  }, []);

  const totalAmount = cartItems.reduce((total, item) => {
    const itemTotal = item.products.reduce((sum, product) => sum + (product.products_price * product.quantity), 0);
    return total + itemTotal;
  }, 0);

  return (
    <div className="cart-page">
      <div className="grid wide">
        <h2 className="cart-title">Giỏ hàng</h2>
        
        <table className="cart-table">
          <thead>
            <tr>
            <th className="product-image" ></th>
              <th className="product-name" >Sản phẩm</th>
              <th className="product-price">Giá</th>
              <th className="product-quantity">Số lượng</th>
              <th className="product-subtotal">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              item.products.map(product => (
                <tr key={product.products_id}>
                  <td className="product-image" style={{ textAlign: 'left' }}>
                    <div className="cart-item" style={{ display: 'flex', alignItems: 'center' }}>
                      <span><img 
                        src={product.products_image} 
                        alt={product.products_name} 
                        className="cart-item-image" 
                        style={{ width: '80px', marginRight: '10px' }} 
                      /></span>
                    </div>
                  </td>
                  <td className="product-name">
                    <div className="cart-item">
                      <span>{product.products_name}</span>
                    </div>
                  </td>
              
                  <td className="product-price">{product.products_price.toLocaleString()}₫</td>
                  <td className="product-quantity">
                    <input
                      type="number"
                      value={product.quantity}
                      min="0"
                      onChange={(e) => updateQuantity(item._id, product.products_id, Number(e.target.value))}
                    />
                  </td>
                  <td className="product-subtotal">
                    {(product.products_price * product.quantity).toLocaleString()}₫
                  </td>
                </tr>
              ))
              
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <h3 className="cart-summary-title">Tổng số giỏ hàng</h3>
          <div className="cart-summary-details">
            <div className="cart-summary-item">
              <span className="summary-label">Tổng phụ:</span>
              <span className="summary-value">{totalAmount.toLocaleString()}₫</span>
            </div>
            <div className="cart-summary-item">
              <span className="summary-label">Tổng tiền:</span>
              <span className="summary-value">{totalAmount.toLocaleString()}₫</span>
            </div>
          </div>
          <button className="checkout-button" onClick={() => navigate('/checkout')}>
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

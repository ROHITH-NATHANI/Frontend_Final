import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css'; // Optional styling file

const CartItem = ({ onContinueShopping }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateItemSubtotal = (item) => {
    const price = parseFloat(item.cost.substring(1)); // "$15" -> 15
    return (price * item.quantity).toFixed(2);
  };

  const calculateTotalAmount = () => {
    return items
      .reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0)
      .toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.cost}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <p>Subtotal: ${calculateItemSubtotal(item)}</p>
                <button className="remove-button" onClick={() => handleRemove(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${calculateTotalAmount()}</h3>
          </div>
          <div className="cart-actions">
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;

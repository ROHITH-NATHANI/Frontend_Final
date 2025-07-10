import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css'; // Optional styling file

const CartItem = ({ onContinueShopping }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total cart amount
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.cost.substring(1)); // remove "$"
            return total + price * item.quantity;
        }, 0).toFixed(2);
    };

    // Calculate item subtotal
    const calculateItemSubtotal = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return (price * item.quantity).toFixed(2);
    };

    // Increment quantity
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    // Decrement quantity or remove if 0
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // Remove item from cart
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const handleCheckoutShopping = () => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty. Go back and add some plants!</p>
            ) : (
                <div>
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.name}</h3>
                                <p>{item.cost}</p>
                                <div className="cart-quantity">
                                    <button onClick={() => handleDecrement(item)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrement(item)}>+</button>
                                </div>
                                <p>Subtotal: ${calculateItemSubtotal(item)}</p>
                                <button onClick={() => handleRemove(item)} className="remove-btn">Remove</button>
                            </div>
                        </div>
                    ))}

                    <h3>Total: ${calculateTotalAmount()}</h3>

                    <div className="cart-actions">
                        <button onClick={onContinueShopping}>Continue Shopping</button>
                        <button onClick={handleCheckoutShopping}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItem;

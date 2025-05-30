import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import styles from '../styles/Cart.module.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addItem, removeItem, updateItemQuantity } = useContext(CartContext);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      savedCartItems.forEach(item => addItem(item));
    }
  }, [addItem]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      quantity = 1;
    }
    updateItemQuantity(id, quantity);
  };

  const handleAddItem = (item) => {
    addItem(item);
    setToastMessage(`${item.title} added to cart`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.cart}>
      <h2 className={styles.cartTitle}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.title} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <h3 className={styles.cartItemTitle}>{item.title}</h3>
                <p className={styles.cartItemPrice}>${item.price}</p>
                <div className={styles.quantityControls}>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className={styles.cartItemQuantity}
                  />
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => handleRemoveItem(item.id)} className={styles.removeItemButton}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</div>
      <div className={styles.cartActions}>
        <Link to="/" className={styles.continueShoppingButton}>Continue Shopping</Link>
        <Link to="/checkout" className={styles.proceedToCheckoutButton}>Proceed to Checkout</Link>
      </div>
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  );
};

export default Cart;

import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const { cartItems, addItem, removeItem, updateItemQuantity } = useContext(CartContext);

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
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className={styles.cartItemQuantity}
                />
                <button onClick={() => handleRemoveItem(item.id)} className={styles.removeItemButton}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</div>
      <button className={styles.checkoutButton}>Checkout</button>
    </div>
  );
};

export default Cart;

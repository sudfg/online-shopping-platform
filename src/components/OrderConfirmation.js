import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import styles from '../styles/OrderConfirmation.module.css';

const OrderConfirmation = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className={styles.orderConfirmation}>
      <h2 className={styles.title}>Order Success</h2>
      <p className={styles.message}>Thank you for your purchase!</p>
      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <h4 className={styles.cartItemTitle}>{item.title}</h4>
                  <p className={styles.cartItemPrice}>${item.price}</p>
                  <p className={styles.cartItemQuantity}>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;

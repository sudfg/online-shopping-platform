import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import styles from '../styles/Checkout.module.css';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    // Placeholder for order placement logic
    console.log('Order placed:', { cartItems, shippingInfo });
    clearCart();
    // Redirect to order confirmation page
    window.location.href = '/order-confirmation';
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.checkout}>
      <h2 className={styles.checkoutTitle}>Checkout Summary</h2>
      <div className={styles.cartReview}>
        <h3>Cart Review</h3>
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
        <div className={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</div>
      </div>
      <div className={styles.shippingInfo}>
        <h3>Shipping Information</h3>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingInfo.city}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingInfo.state}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={shippingInfo.zip}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
      <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
        Place Order
      </button>
      <Link to="/cart" className={styles.backToCartButton}>Back to Cart</Link>
    </div>
  );
};

export default Checkout;

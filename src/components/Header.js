import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductsContext } from '../context/ProductsContext'; // Import ProductsContext
import styles from '../styles/Header.module.css';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { updateSearchTerm } = useContext(ProductsContext); // Get updateSearchTerm
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/cart">
              Cart
              {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
            </Link>
          </li>
        </ul>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
          onChange={(e) => updateSearchTerm(e.target.value)} // Call updateSearchTerm
        />
      </nav>
    </header>
  );
};

export default Header;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className={styles.productImage} />
      </Link>
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productPrice}>${product.price}</p>
      <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;

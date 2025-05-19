import React from 'react';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.title} className={styles.productImage} />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productPrice}>${product.price}</p>
      <button className={styles.addToCartButton}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;

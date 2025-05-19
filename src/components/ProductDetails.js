import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/ProductDetails.module.css';

const mockProductDetails = {
  id: 1,
  title: 'Product 1',
  price: 29.99,
  image: 'https://via.placeholder.com/150',
  description: 'This is a detailed description of Product 1.'
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = mockProductDetails; // In a real app, you would fetch the product details based on the id

  return (
    <div className={styles.productDetails}>
      <img src={product.image} alt={product.title} className={styles.productImage} />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productPrice}>${product.price}</p>
      <p className={styles.productDescription}>{product.description}</p>
    </div>
  );
};

export default ProductDetails;

import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/ProductDetails.module.css';

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a detailed description of Product 1.'
  },
  {
    id: 2,
    title: 'Product 2',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a detailed description of Product 2.'
  },
  {
    id: 3,
    title: 'Product 3',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a detailed description of Product 3.'
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = mockProducts.find(product => product.id === parseInt(id, 10));

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

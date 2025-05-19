import React from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.css';

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    title: 'Product 2',
    price: 39.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    title: 'Product 3',
    price: 19.99,
    image: 'https://via.placeholder.com/150'
  }
];

const ProductList = () => {
  return (
    <div className={styles.productList}>
      {mockProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

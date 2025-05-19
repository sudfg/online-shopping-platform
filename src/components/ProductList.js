import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.css';
import { ProductsContext } from '../context/ProductsContext';

const ProductList = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

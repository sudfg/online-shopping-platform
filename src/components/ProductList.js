import React, { useContext } from 'react'; // Removed useState
import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.css';
import { ProductsContext } from '../context/ProductsContext';

const ProductList = () => {
  const { products, searchTerm } = useContext(ProductsContext); // Get products and searchTerm from context

  return (
    <div className={styles.productList}>
      {searchTerm && products.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;

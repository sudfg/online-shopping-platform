import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductsContext } from '../context/ProductsContext';
import styles from '../styles/ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductsContext);
  const product = products.find(product => product.id === parseInt(id, 10));
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    addItem(product);
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className={styles.productDetails}>
      <img src={product.image} alt={product.title} className={styles.productImage} />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productPrice}>${product.price}</p>
      <p className={styles.productDescription}>{product.description}</p>
      <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;

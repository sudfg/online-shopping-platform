import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductCard from './ProductCard';
import { CartContext } from '../context/CartContext';

const product = {
  id: 1,
  title: 'Product 1',
  price: 29.99,
  image: 'https://via.placeholder.com/150',
};

const addItem = jest.fn();

const renderProductCard = () => {
  render(
    <CartContext.Provider value={{ addItem }}>
      <ProductCard product={product} />
    </CartContext.Provider>
  );
};

test('renders product details', () => {
  renderProductCard();
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('$29.99')).toBeInTheDocument();
  expect(screen.getByAltText('Product 1')).toBeInTheDocument();
});

test('calls addItem when "Add to Cart" button is clicked', () => {
  renderProductCard();
  fireEvent.click(screen.getByText('Add to Cart'));
  expect(addItem).toHaveBeenCalledWith(product);
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductsContext } from '../context/ProductsContext';
import ProductDetails from './ProductDetails';

const mockProduct = {
  id: 1,
  title: 'Product 1',
  price: 29.99,
  image: 'https://via.placeholder.com/150',
  description: 'This is a detailed description of Product 1.'
};

const renderWithContext = (component) => {
  return render(
    <CartContext.Provider value={{ addItem: jest.fn() }}>
      <ProductsContext.Provider value={{ products: [mockProduct] }}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </ProductsContext.Provider>
    </CartContext.Provider>
  );
};

test('renders product details', () => {
  renderWithContext(<ProductDetails />);
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('$29.99')).toBeInTheDocument();
  expect(screen.getByText('This is a detailed description of Product 1.')).toBeInTheDocument();
});

test('adds product to cart', () => {
  const addItem = jest.fn();
  render(
    <CartContext.Provider value={{ addItem }}>
      <ProductsContext.Provider value={{ products: [mockProduct] }}>
        <BrowserRouter>
          <ProductDetails />
        </BrowserRouter>
      </ProductsContext.Provider>
    </CartContext.Provider>
  );
  fireEvent.click(screen.getByText('Add to Cart'));
  expect(addItem).toHaveBeenCalledWith(mockProduct);
});

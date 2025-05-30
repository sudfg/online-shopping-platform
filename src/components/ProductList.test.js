import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductList from './ProductList';
import { ProductsContext } from '../context/ProductsContext';

const products = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a detailed description of Product 1.',
    category: 'category1'
  },
  {
    id: 2,
    title: 'Product 2',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a detailed description of Product 2.',
    category: 'category2'
  },
  {
    id: 3,
    title: 'Product 3',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a detailed description of Product 3.',
    category: 'category1'
  }
];

const renderProductList = () => {
  render(
    <ProductsContext.Provider value={{ products }}>
      <ProductList />
    </ProductsContext.Provider>
  );
};

test('renders product list', () => {
  renderProductList();
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Product 2')).toBeInTheDocument();
  expect(screen.getByText('Product 3')).toBeInTheDocument();
});

test('filters products by search term', () => {
  renderProductList();
  fireEvent.change(screen.getByPlaceholderText('Search products...'), { target: { value: 'Product 1' } });
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  expect(screen.queryByText('Product 3')).not.toBeInTheDocument();
});

test('filters products by category', () => {
  renderProductList();
  fireEvent.change(screen.getByDisplayValue('All Categories'), { target: { value: 'category1' } });
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  expect(screen.getByText('Product 3')).toBeInTheDocument();
});

test('sorts products by price', () => {
  renderProductList();
  fireEvent.change(screen.getByDisplayValue('Sort by'), { target: { value: 'price' } });
  const productTitles = screen.getAllByRole('heading', { level: 2 }).map(heading => heading.textContent);
  expect(productTitles).toEqual(['Product 3', 'Product 1', 'Product 2']);
});

test('sorts products by name', () => {
  renderProductList();
  fireEvent.change(screen.getByDisplayValue('Sort by'), { target: { value: 'name' } });
  const productTitles = screen.getAllByRole('heading', { level: 2 }).map(heading => heading.textContent);
  expect(productTitles).toEqual(['Product 1', 'Product 2', 'Product 3']);
});

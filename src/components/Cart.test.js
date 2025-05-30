import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cart from './Cart';
import { CartContext } from '../context/CartContext';

const renderWithContext = (component) => {
  const cartItems = [
    { id: 1, title: 'Product 1', price: 10, quantity: 1, image: 'image1.jpg' },
    { id: 2, title: 'Product 2', price: 20, quantity: 2, image: 'image2.jpg' },
  ];

  return render(
    <CartContext.Provider value={{ cartItems, addItem: jest.fn(), removeItem: jest.fn(), updateItemQuantity: jest.fn() }}>
      <Router>
        {component}
      </Router>
    </CartContext.Provider>
  );
};

test('renders shopping cart title', () => {
  renderWithContext(<Cart />);
  const titleElement = screen.getByText(/shopping cart/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders cart items', () => {
  renderWithContext(<Cart />);
  const itemElements = screen.getAllByRole('listitem');
  expect(itemElements.length).toBe(2);
});

test('renders total price', () => {
  renderWithContext(<Cart />);
  const totalPriceElement = screen.getByText(/total price: \$50.00/i);
  expect(totalPriceElement).toBeInTheDocument();
});

test('calls removeItem when remove button is clicked', () => {
  const removeItem = jest.fn();
  render(
    <CartContext.Provider value={{ cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 1, image: 'image1.jpg' }], addItem: jest.fn(), removeItem, updateItemQuantity: jest.fn() }}>
      <Router>
        <Cart />
      </Router>
    </CartContext.Provider>
  );
  const removeButton = screen.getByText(/remove/i);
  fireEvent.click(removeButton);
  expect(removeItem).toHaveBeenCalledWith(1);
});

test('calls updateItemQuantity when quantity is changed', () => {
  const updateItemQuantity = jest.fn();
  render(
    <CartContext.Provider value={{ cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 1, image: 'image1.jpg' }], addItem: jest.fn(), removeItem: jest.fn(), updateItemQuantity }}>
      <Router>
        <Cart />
      </Router>
    </CartContext.Provider>
  );
  const quantityInput = screen.getByDisplayValue('1');
  fireEvent.change(quantityInput, { target: { value: '2' } });
  expect(updateItemQuantity).toHaveBeenCalledWith(1, 2);
});

test('renders continue shopping button', () => {
  renderWithContext(<Cart />);
  const continueShoppingButton = screen.getByText(/continue shopping/i);
  expect(continueShoppingButton).toBeInTheDocument();
});

test('renders proceed to checkout button', () => {
  renderWithContext(<Cart />);
  const proceedToCheckoutButton = screen.getByText(/proceed to checkout/i);
  expect(proceedToCheckoutButton).toBeInTheDocument();
});

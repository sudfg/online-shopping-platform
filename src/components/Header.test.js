import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { CartContext } from '../context/CartContext';

const renderWithContext = (component) => {
  const cartItems = [
    { id: 1, title: 'Product 1', price: 10, quantity: 1, image: 'image1.jpg' },
    { id: 2, title: 'Product 2', price: 20, quantity: 2, image: 'image2.jpg' },
  ];

  return render(
    <CartContext.Provider value={{ cartItems }}>
      <Router>
        {component}
      </Router>
    </CartContext.Provider>
  );
};

test('renders navigation links', () => {
  renderWithContext(<Header />);
  const homeLink = screen.getByText(/home/i);
  const shopLink = screen.getByText(/shop/i);
  const cartLink = screen.getByText(/cart/i);
  expect(homeLink).toBeInTheDocument();
  expect(shopLink).toBeInTheDocument();
  expect(cartLink).toBeInTheDocument();
});

test('renders cart item count', () => {
  renderWithContext(<Header />);
  const cartBadge = screen.getByText('3');
  expect(cartBadge).toBeInTheDocument();
});

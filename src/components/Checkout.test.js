import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Checkout from './Checkout';
import { CartContext } from '../context/CartContext';

const renderWithContext = (ui, { cartItems, clearCart }) => {
  return render(
    <CartContext.Provider value={{ cartItems, clearCart }}>
      <Router>{ui}</Router>
    </CartContext.Provider>
  );
};

describe('Checkout Component', () => {
  const cartItems = [
    {
      id: 1,
      title: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
      quantity: 1,
    },
  ];

  const clearCart = jest.fn();

  test('renders Checkout component', () => {
    renderWithContext(<Checkout />, { cartItems, clearCart });

    expect(screen.getByText('Checkout Summary')).toBeInTheDocument();
    expect(screen.getByText('Cart Review')).toBeInTheDocument();
    expect(screen.getByText('Shipping Information')).toBeInTheDocument();
  });

  test('displays cart items', () => {
    renderWithContext(<Checkout />, { cartItems, clearCart });

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
  });

  test('displays total price', () => {
    renderWithContext(<Checkout />, { cartItems, clearCart });

    expect(screen.getByText('Total Price: $99.97')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    renderWithContext(<Checkout />, { cartItems, clearCart });

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    const addressInput = screen.getByLabelText('Address');
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    expect(addressInput.value).toBe('123 Main St');
  });

  test('places order and clears cart', () => {
    renderWithContext(<Checkout />, { cartItems, clearCart });

    const placeOrderButton = screen.getByText('Place Order');
    fireEvent.click(placeOrderButton);

    expect(clearCart).toHaveBeenCalled();
  });

  test('navigates back to cart', () => {
    renderWithContext(<Checkout />, { cartItems, clearCart });

    const backToCartButton = screen.getByText('Back to Cart');
    expect(backToCartButton).toBeInTheDocument();
  });
});

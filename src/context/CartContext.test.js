import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartProvider, CartContext } from './CartContext';

describe('CartContext', () => {
  it('should provide cartItems, addItem, removeItem, and updateItemQuantity', () => {
    render(
      <CartProvider>
        <CartContext.Consumer>
          {({ cartItems, addItem, removeItem, updateItemQuantity }) => (
            <>
              <div data-testid="cartItems">{cartItems.length}</div>
              <button onClick={() => addItem({ id: 1, title: 'Product 1', price: 10 })}>Add Item</button>
              <button onClick={() => removeItem(1)}>Remove Item</button>
              <button onClick={() => updateItemQuantity(1, 2)}>Update Quantity</button>
            </>
          )}
        </CartContext.Consumer>
      </CartProvider>
    );

    expect(screen.getByTestId('cartItems').textContent).toBe('0');

    screen.getByText('Add Item').click();
    expect(screen.getByTestId('cartItems').textContent).toBe('1');

    screen.getByText('Update Quantity').click();
    expect(screen.getByTestId('cartItems').textContent).toBe('1');

    screen.getByText('Remove Item').click();
    expect(screen.getByTestId('cartItems').textContent).toBe('0');
  });
});

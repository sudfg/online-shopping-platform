import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductsProvider, ProductsContext } from './ProductsContext';

describe('ProductsContext', () => {
  it('should provide products', () => {
    render(
      <ProductsProvider>
        <ProductsContext.Consumer>
          {({ products }) => (
            <div data-testid="products">{products.length}</div>
          )}
        </ProductsContext.Consumer>
      </ProductsProvider>
    );

    expect(screen.getByTestId('products').textContent).toBe('3');
  });
});

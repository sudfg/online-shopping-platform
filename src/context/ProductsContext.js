import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a detailed description of Product 1.'
  },
  {
    id: 2,
    title: 'Product 2',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a detailed description of Product 2.'
  },
  {
    id: 3,
    title: 'Product 3',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a detailed description of Product 3.'
  }
];

export const ProductsProvider = ({ children }) => {
  const [products] = useState(mockProducts);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

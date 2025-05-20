import React, { createContext, useState, useMemo } from 'react';

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
  const [allProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return allProducts;
    }
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProducts, searchTerm]);

  return (
    <ProductsContext.Provider value={{ products: filteredProducts, searchTerm, updateSearchTerm }}>
      {children}
    </ProductsContext.Provider>
  );
};

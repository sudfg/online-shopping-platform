import React, { useContext, useState } from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/ProductList.module.css';
import { ProductsContext } from '../context/ProductsContext';

const ProductList = () => {
  const { products } = useContext(ProductsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'price') {
      return a.price - b.price;
    } else if (sortOption === 'name') {
      return a.title.localeCompare(b.title);
    } else {
      return 0;
    }
  });

  return (
    <div className={styles.productList}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <select value={categoryFilter} onChange={handleCategoryChange} className={styles.categoryFilter}>
          <option value="">All Categories</option>
          {/* Add options for each category */}
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
        <select value={sortOption} onChange={handleSortChange} className={styles.sortDropdown}>
          <option value="">Sort by</option>
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>
      {sortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

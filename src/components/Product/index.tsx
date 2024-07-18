// app/components/ClientComponent.js
'use client';

import { useState, useEffect } from 'react';

function ClientComponent({ initialProducts, initialPage, initialCategory }: any) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(initialPage);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const categoryQuery = category ? `&category=${category}` : '';
      const res = await fetch(`https://fakestoreapi.com/products?limit=10&page=${page}${categoryQuery}`);
      const data = await res.json();
      setProducts(data);
    };

    fetchFilteredProducts();
  }, [page, category]);

  const handleNextPage = () => {
    setPage((prevPage: any) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage: any) => Math.max(prevPage - 1, 1));
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
    setPage(1); // Reset to first page when category changes
  };

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <label>
          Filter by category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men Clothing</option>
            <option value="women's clothing">Women Clothing</option>
          </select>
        </label>
      </div>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default ClientComponent;

// products.js

import React from 'react';
// import ClientComponent from './ClientComponent';
import ProductClient from '@/components/Product';

// Define constants for pagination
const PAGE_SIZE = 10;

// async function fetchProducts(page: number) {
//   const res = await fetch(`https://fakestoreapi.com/products?limit=${PAGE_SIZE}&page=${page}`);
//   const data = await res.json();
//   return data;
// }

// export default async function ProductsPage({ searchParams }: any) {
//   const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
//   const products = await fetchProducts(page);

//   return (
//     <div>
//       <h1>Products</h1>
//       <ProductClient products={products} currentPage={page} />
//     </div>
//   );
// }



async function fetchProducts(page: any, category: any) {
  const categoryQuery = category ? `&category=${category}` : '';
  const res = await fetch(`https://fakestoreapi.com/products?limit=10&page=${page}${categoryQuery}`);
  const data = await res.json();
  return data;
}

export default async function ProductsPage({ searchParams }: any) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const category = searchParams.category || '';
  const products = await fetchProducts(page, category);

  return (
    <div>
      <h1>Products</h1>
      <ProductClient initialProducts={products} initialPage={page} initialCategory={category} />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import ProductListing from './ProductListing';
import Spinner from './Spinner';

const ProductListings = ({ isHome = false }) => {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl =  '/api/user/products';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const limitedProducts = isHome ? data.products.slice(0, 4) : data.products;
        setProducts(limitedProducts);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false); // Flag to indicate if the user has performed a search

  const handleSetResults = (results) => {
    setSearchResults(results);
    setSearched(true);
  };

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Products' : 'Browse Products'}
        </h2>
        {isHome ? '':<SearchBar setResults={handleSetResults} products={Products} />}
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg'>
            {searched ? ( // If searched
            searchResults.map((result) => (
              <ProductListing
              key={result.productId}
              product={result}
              />
            ))
          ) : (
            Products.map((product) => (
              <ProductListing
              key={product.productId}
              product={product}
              />
            ))
          )}
          </div>
        )}
      </div>
    </section>
  );
};
export default ProductListings;
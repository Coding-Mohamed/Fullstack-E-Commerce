import { useState, useEffect } from "react";
import "./Style/ProductListings.css"; // Import your styles
import { useDispatch, useSelector } from "react-redux";
import { getProducts, addToCart } from "../features/products/ProductSlice";
import { Link } from "react-router-dom";
/* import CategoryList from "./CategoryList";
 */ import TopSelling from "./TopSelling";
import Reviews from "./Reviews";

const ProductListings = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setDisplayedProducts(showAll ? products : products.slice(0, 8));
  }, [products, showAll]);

  const toggleProducts = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="product-listings">
        {/*   <div className="dropdown">
          <button className="dropbtn">Categories</button>
          <div className="dropdown-content">
            <CategoryList />
          </div>
        </div> */}
        <div className="products">
          {displayedProducts.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} className="product-item">
              <img src={product.images[0]} alt={product.name} width="270" height="295" />
              <h3>{product.name}</h3>
              <div className="add-to-cart">
                <p>${product.price}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addToCart(product));
                  }}
                  className="addcart-btn"
                >
                  Add to Cart
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="buy">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/products" onClick={toggleProducts} className="load">
          {showAll ? "See Less" : "Load More"}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </Link>
      </div>
      <Reviews />
      <TopSelling />
    </>
  );
};

export default ProductListings;

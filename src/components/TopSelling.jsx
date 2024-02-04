import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/products/ProductSlice";
import "./style/TopSelling.css";

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const productsContainerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://js2-ecommerce-api.vercel.app/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const handlePrevClick = () => {
    scrollContainer(-1);
  };

  const handleNextClick = () => {
    scrollContainer(1);
  };

  const scrollContainer = (direction) => {
    if (productsContainerRef.current) {
      const itemWidth = productsContainerRef.current.children[0].offsetWidth;
      const containerWidth = productsContainerRef.current.offsetWidth;
      const scrollAmount = direction * itemWidth;

      if (direction === -1 && productsContainerRef.current.scrollLeft === 0) {
        productsContainerRef.current.scrollTo({
          left: products.length * itemWidth - containerWidth,
          behavior: "smooth",
        });
      } else if (direction === 1 && productsContainerRef.current.scrollLeft + containerWidth >= productsContainerRef.current.scrollWidth) {
        productsContainerRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        productsContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="top-selling-container">
      <h2>Top Selling Items This Week</h2>
      <div className="top-products-container" ref={productsContainerRef}>
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="top-product-item">
            <img src={product.images[0]} alt={product.name} width="270" height="295" className="product-image" />
            <h3>{product.name}</h3>
            <div className="top-add-to-cart">
              <p className="price">${product.price}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addToCart(product));
                }}
                className="addcart-top-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="top-buy">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="top-navigation-buttons">
        <button onClick={handlePrevClick}>&lt;</button>
        <button onClick={handleNextClick}>&gt;</button>
      </div>
    </div>
  );
};

export default TopSelling;

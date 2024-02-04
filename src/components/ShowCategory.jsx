import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/products/ProductSlice";
import "./style/ShowCategory.css";
import CategoryList from "./CategoryList";
import TopSelling from "./TopSelling";

function ShowProducts() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://js2-ecommerce-api.vercel.app/api/products");

      if (response.ok) {
        const data = await response.json();
        const productsInCategory = data.filter((product) => product.category === category);
        setProducts(productsInCategory);
      } else {
        console.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <div className="category-container">
        <p className="category-title m-0 mx-auto">
          <CategoryList />
          All items within <span className="fs-2 text-primary">{category}</span> in the store.
        </p>
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="product-card">
            <img src={product.images[0]} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <div className="category-cart">
              <p className="product-price">${product.price}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addToCart(product));
                }}
                className="category-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="category-buy">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
            </div>
          </Link>
        ))}
      </div>
      <TopSelling />
    </>
  );
}

export default ShowProducts;

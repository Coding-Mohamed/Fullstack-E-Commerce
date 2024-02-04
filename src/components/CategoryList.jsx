import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://js2-ecommerce-api.vercel.app/api/products";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(API_URL);

      if (response.ok) {
        const data = await response.json();
        const categoriesWithImages = data.reduce((acc, product) => {
          if (!acc.find((cat) => cat.name === product.category)) {
            acc.push({ name: product.category, image: product.images[0] });
          }
          return acc;
        }, []);
        setCategories(categoriesWithImages);
      } else {
        console.error(`Failed to fetch categories from ${API_URL}`);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-5 text-bg-info text-center rounded-2 w-100">
      <h1 className="mb-4">Categories</h1>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {categories.map((category) => (
          <div className="card m-2 mb-5 card-width" key={category.name}>
            <div className="card-body">
              <Link to={`/categories/${category.name}`} className="text-decoration-none color-light">
                <img src={category.image} className="card-img-top" alt={category.name} />
                <h3 className="card-title border border-top-5 mt-3 rounded-2">{category.name}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;

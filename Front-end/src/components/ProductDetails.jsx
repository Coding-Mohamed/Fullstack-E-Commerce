import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts, addToCart } from "../features/products/ProductSlice";
import "./Style/ProductDetails.css";
import TopSelling from "./TopSelling";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const product = products.find((p) => p._id === productId);

  // Update selectedImage when productId changes
  const [selectedImage, setSelectedImage] = useState(product ? product.images[0] : null);
  useEffect(() => {
    // Check if the product is available and has images
    if (product && product.images.length > 0) {
      setSelectedImage(product.images[0]); // Set the first image as selected when productId changes
    }
  }, [productId, product]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log("Product added to cart:", product);
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

  if (!product) {
    return <div className="product-details">Product not found</div>;
  }

  return (
    <>
      <div className="product-details">
        <h2>{product.name}</h2>
        <div className="image-gallery">
          <div className="main-image">
            <img src={selectedImage} alt={product.name} />
          </div>
          <div className="thumbnail-gallery">
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={product.name} className={selectedImage === image ? "selected" : ""} onClick={() => setSelectedImage(image)} />
            ))}
          </div>
        </div>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <TopSelling />
    </>
  );
};

export default ProductDetails;

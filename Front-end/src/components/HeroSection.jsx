import { Link } from "react-router-dom";
import "./style/HeroSection.css";
import ProductListings from "./ProductListings";

function HeroSection() {
  return (
    <>
      <div className="hero-section">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="dark-overlay">
                <img src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHRlY2glMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
              </div>
            </div>
            <div className="carousel-item">
              <div className="dark-overlay">
                <img src="https://images.unsplash.com/photo-1563286094-6e420626b6f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaCUyMHN0b3JlfGVufDB8fDB8fHww" alt="" />
              </div>
            </div>
            <div className="carousel-item">
              <div className="dark-overlay">
                <img src="https://images.unsplash.com/photo-1627882278101-88cac371b54f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </div>
            </div>
          </div>
          <div className="hero-text">
            <h1>Discover the Future Today! </h1>
            <Link to="/products" className="hero-link">
              Shop now
            </Link>
          </div>
        </div>
      </div>
      <ProductListings />
    </>
  );
}

export default HeroSection;

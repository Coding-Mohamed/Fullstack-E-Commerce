import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductListings from "./components/ProductListings";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import Footer from "./components/Footer";
import RegisterPage from "./components/Auth/RegisterPage";
import LoginPage from "./components/Auth/LoginPage";
import MyOrderPage from "./components/Pages/MyOrderPage";
import ShowCategory from "./components/ShowCategory";
import NotFoundPage from "./components/Pages/NotFoundPage";
import CategoryList from "./components/CategoryList";

const AppContent = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<HeroSection />} />
        <Route path="/products" element={<ProductListings />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/categories/:category" element={<ShowCategory />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/orders" element={<MyOrderPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default AppContent;

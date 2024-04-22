import axios from "axios";

const productService = {
  fetchProducts: async () => {
    return await axios.get("https://js2-ecommerce-api.vercel.app/api/products");
  },
};

export default productService;

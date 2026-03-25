// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API = {
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT: (id) => `${API_BASE_URL}/product/${id}`,
  FILTER: (category, subcategory) => `${API_BASE_URL}/filter?category=${category}&subcategory=${subcategory}`,
};

export default API;

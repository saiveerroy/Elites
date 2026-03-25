import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Footwear from "./pages/Footwear";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import SubcategoryProducts from "./pages/SubcategoryProducts";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/men/:subcategory" element={<SubcategoryProducts category="men" />} />

        <Route path="/women" element={<Women />} />
        <Route path="/women/:subcategory" element={<SubcategoryProducts category="women" />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/footwear" element={<Footwear />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
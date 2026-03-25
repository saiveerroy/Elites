import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../config/api";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(API.PRODUCT(id))
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  return (
    <>
      <Navbar />

      <div className="product-page">
        <img src={product.image} />
        <div>
          <h2>{product.name}</h2>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>

          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
}

export default Product;
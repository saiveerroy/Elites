import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/product/${id}`)
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
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} width="300" />
      <p>${product.price}</p>
      <p>{product.description}</p>

      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
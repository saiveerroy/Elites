import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function removeItem(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.map((item, i) => (
        <div key={i}>
          {item.name} - ${item.price}
          <button onClick={() => removeItem(i)}>❌</button>
        </div>
      ))}

      <h3>Total: ${total}</h3>
    </div>
  );
}

export default Cart;
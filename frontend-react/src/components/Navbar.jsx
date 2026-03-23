import { Link } from "react-router-dom";

function Navbar() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <header className="navbar">
      <h2 className="logo">Elites</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart 🛒 ({cart.length})</Link>
      </nav>
    </header>
  );
}

export default Navbar;
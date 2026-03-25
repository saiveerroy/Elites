import { Link } from "react-router-dom";

function Navbar() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <header className="navbar">
      <h2 className="logo">Elites</h2>

      <nav className="nav-container">
        <div style={styles.middle}>
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
        <Link to="/kids">Kids</Link>
        <Link to="/footwear">Footwear</Link>
        </div>
        <Link to="/cart">Cart 🛒 ({cart.length})</Link>
      </nav>
    </header>
  );
}

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
  },

  logo: {
    margin: 0,
  },

  navContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1, // takes full width
  },

  middle: {
    display: "flex",
    gap: "20px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  }
  

};
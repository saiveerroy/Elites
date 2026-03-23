import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>New Collection 🔥</h1>
        <p>Upgrade your style today</p>
      </section>

      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card">
            <img src={p.image} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>

            <button onClick={() => navigate(`/product/${p.id}`)}>
              View
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
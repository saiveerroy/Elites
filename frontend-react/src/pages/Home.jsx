import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Elites Store</h1>

      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card">
            <img src={p.image} width="200" />
            <h3>{p.name}</h3>
            <p>${p.price}</p>

            <button onClick={() => navigate(`/product/${p.id}`)}>
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
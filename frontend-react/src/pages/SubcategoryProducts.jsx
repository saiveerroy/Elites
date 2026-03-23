import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SubcategoryProducts({ category }) {
  const { subcategory } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Adjust URL according to your backend API
        const response = await fetch(
            `http://localhost:3000/products/filter?category=${category}&subcategory=${subcategory}`
            );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, [category, subcategory]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textTransform: "capitalize" }}>
        {subcategory.replace(/-/g, " ")}
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
                borderRadius: "5px",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default SubcategoryProducts;
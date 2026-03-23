// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const categories = [
    { name: "Men", image: "/images/categories/men.jpg", link: "/men" },
    { name: "Women", image: "/images/categories/women.jpg", link: "/women" },
    { name: "Kids", image: "/images/categories/kids.jpg", link: "/kids" },
    { name: "Footwear", image: "/images/categories/footwear.jpg", link: "/footwear" },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>

          <h1 style={styles.heroTitle}>

            <span style={styles.gradientText}>Step Into Style</span> 🔥
          </h1>

          <p style={styles.heroSubtitle}>Trendy collections just for you</p>
          
          <div style={styles.heroButtons}>
            
            <button style={styles.heroButton} onClick={() => navigate("/men")}>
              Shop Men
            </button>

            <button style={styles.heroButtonSecondary} onClick={() => navigate("/women")}>
              Shop Women
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.categoriesSection}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <div style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              style={styles.categoryCard}
              onClick={() => navigate(cat.link)}
            >
              <img src={cat.image} alt={cat.name} style={styles.categoryImage} />
              <div style={styles.categoryOverlay}>
                <h3 style={styles.categoryName}>{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section style={styles.featuredSection}>

        <h2 style={styles.sectionTitle}>Trending Products</h2>

        <div style={styles.carousel}>
          {products.slice(0, 12).map((product) => (

            <div
              key={product.id}
              style={styles.card}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.image} alt={product.name} style={styles.cardImage} />
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{product.name}</h3>
                <p style={styles.cardPrice}>₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const styles = {
  hero: {
    position: "relative",
    width: "100%",
    height: "600px",
    background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/hero.jpg') center/cover no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroOverlay: {
    backgroundColor: "rgba(113, 107, 107, 0.8)",
    padding: "60px",
    borderRadius: "30px",
    textAlign: "center",
    color: "#fff",
    backdropFilter: "blur(10px)",
    animation: "slideUp 1s ease-out",
  },
  gradientText: {
    background: "linear-gradient(90deg, #ff4b2b, #ff416c, #f9d423)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroTitle: { fontSize: "3.5rem", marginBottom: "20px", fontWeight: "bold" },
  heroSubtitle: { fontSize: "1.3rem", marginBottom: "30px", fontWeight: "500" },
  heroButtons: { display: "flex", justifyContent: "center", gap: "20px" },
  heroButton: {
    padding: "15px 40px",
    background: "linear-gradient(90deg,#f9d423,#ff4b2b)",
    border: "none",
    borderRadius: "30px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    transition: "0.4s",
  },
  heroButtonSecondary: {
    padding: "15px 40px",
    background: "#fff",
    color: "#ff416c",
    fontWeight: "bold",
    borderRadius: "30px",
    border: "2px solid #ff416c",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "0.4s",
  },
  categoriesSection: { padding: "60px 20px", background: "#fff7f7" },
  sectionTitle: { fontSize: "2.3rem", fontWeight: "bold", marginBottom: "40px", textAlign: "center", color: "#413f3f" },
  categoriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "25px",
  },
  categoryCard: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "20px",
    transition: "transform 0.4s, box-shadow 0.4s",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
  },
  categoryImage: {
    width: "100%",
    height: "450px",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  categoryOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60px",
    background: "linear-gradient(to top, rgba(240, 149, 170, 0.8), transparent)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: { color: "#fff", fontWeight: "bold", fontSize: "1.3rem" },
  featuredSection: { padding: "60px 20px" },
  carousel: {
    display: "flex",
    overflowX: "auto",
    gap: "25px",
    paddingBottom: "20px",
    scrollSnapType: "x mandatory",
  },
  card: {
    minWidth: "220px",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(0,0,0,0.2)",
    transition: "transform 0.4s, box-shadow 0.4s",
  },
  cardImage: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    transition: "transform 0.4s",
  },
  cardContent: { padding: "15px", textAlign: "center", background: "#fff" },
  cardTitle: { fontSize: "1.1rem", margin: "10px 0", fontWeight: "600", color: "#333" },
  cardPrice: { color: "#ff416c"
  , fontWeight: "bold", 
  fontSize: "1.1rem" },
};

export default Home;
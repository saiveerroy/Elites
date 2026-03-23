//src/pages/Women.jsx
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const womenCategories = [
  {
    title: "TOPWEAR",
    items: [
      { name: "Tops & Tees", image: "/images/women/tees.jpg" },
      { name: "Kurtas", image: "/images/women/kurtas.jpg" },
      { name: "Dresses", image: "/images/women/dresses.jpg" },
      { name: "Winterwear", image: "/images/women/winterwear.jpg" },
      { name: "Blazers", image: "/images/women/blazers.jpg" },
    ],
  },
  {
    title: "BOTTOMWEAR",
    items: [
      { name: "Skirts", image: "/images/women/skirts.jpg" },
      { name: "Jeans", image: "/images/women/jeans.jpg" },
      { name: "Shorts", image: "/images/women/shorts.jpg" },
      { name: "Leggings", image: "/images/women/leggings.jpg" },
    ],
  },
  {
    title: "ACCESSORIES",
    items: [
      { name: "Bags", image: "/images/women/bags.jpg" },
      { name: "Watches", image: "/images/women/watches.jpg" },
      { name: "Goggles", image: "/images/women/goggles.jpg" },
      { name: "Perfume", image: "/images/women/perfume.jpg" },
    ],
  },
];

function Women() {

  const navigate = useNavigate();

  // Convert name to URL-friendly slug (e.g., "T-Shirts" → "t-shirts")
  function toSlug(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
  }

  function handleClick(name) {
    const slug = toSlug(name);
    navigate(`/women/${slug}`);
  }

  return (
    <div style={styles.container}>
      {womenCategories.map(({ title, items }) => (

        <div key={title} style={styles.category}>

          <h3 style={styles.title}>{title}</h3>

          <ul style={styles.list}>
            
            {items.map(({ name, image }) => (
              <li
                key={name}
                style={styles.listItem}
                onClick={() => handleClick(name)}
              >
                <img src={image} alt={name} style={styles.image} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    display: "flex",
    gap: "100px",
  },
  category: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontstyle: "italic",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
    
  },
  name:{
    fontstyle: "italic",
  }
};

export default Women;
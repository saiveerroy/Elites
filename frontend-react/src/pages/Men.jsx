//src/pages/Men.jsx
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const menCategories = [
  {
    title: "TOPWEAR",
    items: [
      { name: "Shirts", image: "/images/men/shirts.jpg" },
      { name: "T-Shirts", image: "/images/men/tshirts.jpg" },
      { name: "Blazers", image: "/images/men/blazers.jpg" },
      { name: "Winterwear", image: "/images/men/winterwear.jpg" },
      { name: "Formals", image: "/images/men/formal.jpg" },
    ],
  },
  {
    title: "BOTTOMWEAR",
    items: [
      { name: "Trousers", image: "/images/men/trousers.jpg" },
      { name: "Jeans", image: "/images/men/jeans.jpg" },
      { name: "Shorts", image: "/images/men/shorts.jpg" },
      { name: "Cargos", image: "/images/men/cargos.jpg" },
    ],
  },
  {
    title: "ACCESSORIES",
    items: [
      { name: "Watches", image: "/images/men/watches.jpg" },
      { name: "Belts", image: "/images/men/belts.jpg" },
      { name: "Wallets", image: "/images/men/wallets.jpg" },
      { name: "Perfume", image: "/images/men/perfume.jpg" },
      { name: "Combos And Ties", image: "/images/men/combos-ties.jpg" },
    ],
  },
];

function Men() {

  const navigate = useNavigate();

  // Convert name to URL-friendly slug (e.g., "T-Shirts" → "t-shirts")
  function toSlug(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
  }

  function handleClick(name) {
    const slug = toSlug(name);
    navigate(`/men/${slug}`);
  }

  return (
    <div style={styles.container}>
      {menCategories.map(({ title, items }) => (

        <div key={title} style={styles.category}>

          <h3 style={styles.title}>{title}</h3>

          <ul style={styles.list}>
            
            {items.map(({ name, image }) => (
              <li
                key={name}
                style={styles.listItem}
                onClick={() => alert(`Clicked on ${name}`)}
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
    gap: "50px",
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

export default Men;
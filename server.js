//backend/server.js
const express = require("express");
const { Client } = require('pg');
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("DB Connection Error:", err));

// Get all products
app.get("/products", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// Get single product
app.get("/product/:id", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM products WHERE id=$1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.get("/filter", async (req, res) => {
  const { category, subcategory } = req.query;

  if (!category || !subcategory) {
    return res.status(400).json({ error: "Category and subcategory required" });
  }

  try {
    const query = "SELECT * FROM products WHERE LOWER(category) = LOWER($1) AND LOWER(subcategory) = LOWER($2)";
    const result = await client.query(query, [category, subcategory]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Test route
app.get("/test", (req, res) => {
  console.log("Test route called");
  res.json({ message: "Server is working" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
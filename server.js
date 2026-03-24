//backend/server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "ecommerce"
});

// Get all products
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// Get single product
app.get("/product/:id", (req, res) => {
    db.query("SELECT * FROM products WHERE id=?", [req.params.id], (err, result) => {
        if(err) throw err;
        res.json(result[0]);
    });
});

app.get("/filter", (req, res) => {
  const { category, subcategory } = req.query;

  if (!category || !subcategory) {
    return res.status(400).json({ error: "Category and subcategory required" });
  }

  const query = "SELECT * FROM products WHERE LOWER(category) = LOWER(?) AND LOWER(subcategory) = LOWER(?)";
  db.query(query, [category, subcategory], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Test route
app.get("/test", (req, res) => {
  console.log("Test route called");
  res.json({ message: "Server is working" });
});

db.connect(err => {
    if(err) {
        console.error("DB Connection Error:", err);
        throw err;
    }
    console.log("MySQL Connected");
    console.log("Routes registered");

    app.listen(3000, () => console.log("Server running on port 3000"));
});
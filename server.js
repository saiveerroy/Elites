//backend/server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// Debug: Log environment variables (remove in production)
console.log("Environment variables:");
console.log("MYSQLHOST:", process.env.MYSQLHOST);
console.log("MYSQLUSER:", process.env.MYSQLUSER);
console.log("MYSQLPASSWORD:", process.env.MYSQLPASSWORD ? "***" : "not set");
console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE);
console.log("MYSQLPORT:", process.env.MYSQLPORT);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Parse DATABASE_URL if available (Railway format: mysql://user:pass@host:port/db)
let dbConfig = {
    host: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
    user: process.env.MYSQLUSER || process.env.DB_USER || "root",
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "pass123",
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || "ecommerce",
    port: process.env.MYSQLPORT || 3306
};

if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    dbConfig = {
        host: url.hostname,
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1), // Remove leading slash
        port: url.port
    };
    console.log("Using DATABASE_URL for connection");
}

const db = mysql.createConnection(dbConfig);

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

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
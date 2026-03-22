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

db.connect(err => {
    if(err) throw err;
    console.log("MySQL Connected");
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

app.listen(3000, () => console.log("Server running on port 3000"));
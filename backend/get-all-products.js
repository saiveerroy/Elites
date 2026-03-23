//backend/get-all-products.js
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "ecommerce"
});

db.connect(err => {
    if(err) throw err;
    
    db.query("SELECT id, name, image, category, subcategory FROM products WHERE id > 4", (err, results) => {
        if(err) throw err;
        console.log(JSON.stringify(results, null, 2));
        db.end();
    });
});

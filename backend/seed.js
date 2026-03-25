//backend/seed.js
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "ecommerce"
});

db.connect(err => {
    if(err) throw err;
    console.log("MySQL Connected for seeding");
});

// Create table if not exists
const createTableQuery = `
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    category VARCHAR(50),
    subcategory VARCHAR(50)
);
`;

// Alter table to add columns if they don't exist
const alterTableQueries = [
    "ALTER TABLE products ADD COLUMN category VARCHAR(50)",
    "ALTER TABLE products ADD COLUMN subcategory VARCHAR(50)"
];

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error("Error creating table:", err);
        db.end();
        return;
    }
    console.log("Table created or already exists");

    // Alter table to add missing columns
    let alterIndex = 0;
    const runAlter = () => {
        if (alterIndex < alterTableQueries.length) {
            db.query(alterTableQueries[alterIndex], (err, result) => {
                if (err) {
                    // Column might already exist, that's ok
                    console.log("Alter table (might already have column):", err.code);
                } else {
                    console.log("Altered table successfully");
                }
                alterIndex++;
                runAlter();
            });
        } else {
            // Now insert products
            insertProducts();
        }
    };

    runAlter();
});

function insertProducts() {
    // Sample products data
    const products = [
        // Men Shirts
        { name: "Classic White Shirt", price: 1999, image: "/images/men/shirts/classic-white.jpg", category: "men", subcategory: "shirts" },
        { name: "Blue Denim Shirt", price: 2499, image: "/images/men/shirts/blue-denim.jpg", category: "men", subcategory: "shirts" },
        { name: "Striped Casual Shirt", price: 1799, image: "/images/men/shirts/striped-casual.jpg", category: "men", subcategory: "shirts" },
        { name: "Black Formal Shirt", price: 2299, image: "/images/men/shirts/black-formal.jpg", category: "men", subcategory: "shirts" },
        { name: "Red Check Shirt", price: 1899, image: "/images/men/shirts/red-check.jpg", category: "men", subcategory: "shirts" },

        // Men T-Shirts
        { name: "White Cotton T-Shirt", price: 899, image: "/images/men/tshirts/white-cotton.jpg", category: "men", subcategory: "t-shirts" },
        { name: "Black Polo T-Shirt", price: 1299, image: "/images/men/tshirts/black-polo.jpg", category: "men", subcategory: "t-shirts" },
        { name: "Graphic Print T-Shirt", price: 1099, image: "/images/men/tshirts/graphic-print.jpg", category: "men", subcategory: "t-shirts" },

        // Men Blazers
        { name: "Navy Blue Blazer", price: 5999, image: "/images/men/blazers/navy-blue.jpg", category: "men", subcategory: "blazers" },
        { name: "Grey Formal Blazer", price: 6499, image: "/images/men/blazers/grey-formal.jpg", category: "men", subcategory: "blazers" },

        // Women Tops & Tees
        { name: "White Crop Top", price: 799, image: "/images/women/tees/white-crop.jpg", category: "women", subcategory: "tops & tees" },
        { name: "Black Tank Top", price: 599, image: "/images/women/tees/black-tank.jpg", category: "women", subcategory: "tops & tees" },
        { name: "Striped T-Shirt", price: 899, image: "/images/women/tees/striped-tshirt.jpg", category: "women", subcategory: "tops & tees" },

        // Women Kurtas
        { name: "Blue Cotton Kurta", price: 1499, image: "/images/women/kurtas/blue-cotton.jpg", category: "women", subcategory: "kurtas" },
        { name: "White Embroidered Kurta", price: 1999, image: "/images/women/kurtas/white-embroidered.jpg", category: "women", subcategory: "kurtas" },

        // Women Dresses
        { name: "Red Evening Dress", price: 3499, image: "/images/women/dresses/red-evening.jpg", category: "women", subcategory: "dresses" },
        { name: "Black Midi Dress", price: 2799, image: "/images/women/dresses/black-midi.jpg", category: "women", subcategory: "dresses" },
    ];

    const insertQuery = "INSERT INTO products (name, price, image, category, subcategory) VALUES ?";

    const values = products.map(product => [product.name, product.price, product.image, product.category, product.subcategory]);

    db.query(insertQuery, [values], (err, result) => {
        if (err) {
            console.error("Error inserting products:", err);
        } else {
            console.log(`Inserted ${result.affectedRows} products successfully`);
        }
        db.end();
    });
}
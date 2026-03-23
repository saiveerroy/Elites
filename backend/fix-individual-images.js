//backend/fix-individual-images.js
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "ecommerce"
});

db.connect(err => {
    if(err) throw err;
    console.log("Connected");

    // Update individual shirt images
    const updates = [
        ['Classic White Shirt', '/images/men/shirts/classic-white.jpg', 'men', 'shirts'],
        ['Blue Denim Shirt', '/images/men/shirts/blue-denim.jpg', 'men', 'shirts'],
        ['Striped Casual Shirt', '/images/men/shirts/striped-casual.jpg', 'men', 'shirts'],
        ['Black Formal Shirt', '/images/men/shirts/black-formal.jpg', 'men', 'shirts'],
        ['Red Check Shirt', '/images/men/shirts/red-check.jpg', 'men', 'shirts'],
    ];

    let completed = 0;

    updates.forEach(([productName, imagePath, category, subcategory]) => {
        db.query(
            'UPDATE products SET image = ? WHERE name = ? AND category = ? AND subcategory = ?',
            [imagePath, productName, category, subcategory],
            (err, result) => {
                if(err) console.error(`Error updating ${productName}:`, err);
                else console.log(`Updated ${productName} with ${imagePath}`);
                
                completed++;
                if(completed === updates.length) {
                    console.log('All updates completed!');
                    db.end();
                }
            }
        );
    });
});

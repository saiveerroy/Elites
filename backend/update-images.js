//backend/update-images.js
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

    // Update shirt images
    db.query('UPDATE products SET image = "/images/men/shirts.jpg" WHERE category = "men" AND subcategory = "shirts"', (err, result) => {
        if(err) console.error(err);
        else console.log('Updated shirts:', result.affectedRows);

        // Update t-shirt images
        db.query('UPDATE products SET image = "/images/men/tshirts.jpg" WHERE category = "men" AND subcategory = "t-shirts"', (err, result) => {
            if(err) console.error(err);
            else console.log('Updated t-shirts:', result.affectedRows);

            // Update blazer images
            db.query('UPDATE products SET image = "/images/men/blazers.jpg" WHERE category = "men" AND subcategory = "blazers"', (err, result) => {
                if(err) console.error(err);
                else console.log('Updated blazers:', result.affectedRows);

                // Update women images
                db.query('UPDATE products SET image = "/images/women/tees.jpg" WHERE category = "women" AND subcategory = "tops & tees"', (err, result) => {
                    if(err) console.error(err);
                    else console.log('Updated women tops:', result.affectedRows);

                    db.query('UPDATE products SET image = "/images/women/kurtas.jpg" WHERE category = "women" AND subcategory = "kurtas"', (err, result) => {
                        if(err) console.error(err);
                        else console.log('Updated kurtas:', result.affectedRows);

                        db.query('UPDATE products SET image = "/images/women/dresses.jpg" WHERE category = "women" AND subcategory = "dresses"', (err, result) => {
                            if(err) console.error(err);
                            else console.log('Updated dresses:', result.affectedRows);

                            db.end();
                        });
                    });
                });
            });
        });
    });
});
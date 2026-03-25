# 🚀 Deploy Elites to Railway - Step by Step

## ✅ Prerequisites Completed
- ✅ Code pushed to GitHub: https://github.com/saiveerroy/Elites.git
- ✅ Dependencies installed
- ✅ Railway configuration added

---

## 🎯 Step-by-Step Railway Deployment

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (click "Continue with GitHub")
3. Authorize Railway to access your GitHub account

### Step 2: Create New Project
1. Click **"Start a New Project"**
2. Select **"Deploy from GitHub repo"**
3. Search for and select your **"Elites"** repository
4. Click **"Deploy Now"**

### Step 3: Add MySQL Database
1. In your Railway project dashboard, click **"+ Add"**
2. Select **"Database"** → **"Add MySQL"**
3. Wait for the database to be provisioned (2-3 minutes)
4. Click on the MySQL service to open its details

### Step 4: Get Database Connection Details
1. In the MySQL service, go to the **"Connect"** tab
2. Copy these values (you'll need them for environment variables):
   - **MYSQLHOST** (host)
   - **MYSQLUSER** (username)
   - **MYSQLPASSWORD** (password)
   - **MYSQLDATABASE** (database name)
   - **MYSQLPORT** (port)

### Step 5: Configure Backend Environment Variables
1. In your Railway project, click on the **backend service** (should be named something like "elites-backend")
2. Go to **"Variables"** tab
3. Add these environment variables:

```
DB_HOST=YOUR_MYSQLHOST_VALUE
DB_USER=YOUR_MYSQLUSER_VALUE
DB_PASSWORD=YOUR_MYSQLPASSWORD_VALUE
DB_NAME=YOUR_MYSQLDATABASE_VALUE
PORT=3000
```

**Replace the values with your actual MySQL connection details from Step 4**

### Step 6: Configure Frontend Environment Variables
1. Click on the **frontend service** (should be named something like "elites-frontend")
2. Go to **"Variables"** tab
3. Add this environment variable:

```
VITE_API_URL=YOUR_BACKEND_URL
```

**For the backend URL:**
- Go to your backend service → **"Settings"** tab → **"Railway Domain"**
- Copy the URL (e.g., `https://elites-backend.up.railway.app`)
- Use that as the `VITE_API_URL` value

### Step 7: Create Database Tables
1. In Railway, go to your MySQL service → **"Connect"** tab
2. Click **"Connect with Railway CLI"** or use the connection string
3. Run these SQL commands to create tables:

```sql
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  image VARCHAR(500),
  description TEXT
);

INSERT INTO products (name, price, category, subcategory, image, description) VALUES
('Nike Shoes', 5999, 'footwear', 'sports', '/images/product1.jpg', 'High quality Nike shoes'),
('T-Shirt', 999, 'men', 'shirts', '/images/product2.jpg', 'Cotton T-shirt'),
('Jeans', 1999, 'men', 'pants', '/images/product3.jpg', 'Denim jeans'),
('Saree', 4999, 'women', 'traditional', '/images/product4.jpg', 'Traditional Indian saree'),
('Jacket', 3999, 'women', 'outerwear', '/images/product5.jpg', 'Stylish jacket');
```

### Step 8: Redeploy Services
1. Go to each service (backend and frontend)
2. Click **"Deploy"** to redeploy with new environment variables
3. Wait for both services to finish deploying

### Step 9: Get Your Live URLs
1. **Backend URL:** Go to backend service → Settings → Railway Domain
2. **Frontend URL:** Go to frontend service → Settings → Railway Domain

---

## 🧪 Test Your Deployment

### Test Backend API:
```bash
curl https://your-backend-url.up.railway.app/test
# Should return: {"message":"Server is working"}
```

### Test Products API:
```bash
curl https://your-backend-url.up.railway.app/products
# Should return JSON array of products
```

### Test Frontend:
- Visit your frontend URL in browser
- Should load and display products

---

## 🔧 Troubleshooting

### "Cannot connect to database"
- ✅ Double-check environment variables in Railway
- ✅ Ensure MySQL service is running
- ✅ Verify database tables exist

### "Cannot fetch products" in frontend
- ✅ Check `VITE_API_URL` is set to correct backend URL
- ✅ Redeploy frontend after changing environment variables
- ✅ Check backend logs for errors

### Build fails
- ✅ Check Railway deployment logs
- ✅ Ensure all dependencies are in package.json
- ✅ Verify railway.json configuration

### Service won't start
- ✅ Check environment variables are correct
- ✅ Look at Railway logs for specific error messages
- ✅ Ensure PORT variable is set

---

## 💰 Railway Pricing
- **Free Tier:** $5/month credit (enough for small projects)
- **MySQL:** Included in free tier
- **Custom Domain:** Available on paid plans

---

## 🎉 Success Checklist
- [ ] Railway account created
- [ ] Project connected to GitHub
- [ ] MySQL database added
- [ ] Environment variables configured
- [ ] Database tables created
- [ ] Services deployed successfully
- [ ] Frontend loads products from backend
- [ ] Both URLs working

---

## 📞 Need Help?
If you get stuck on any step, share:
1. The error message you're seeing
2. Which step you're on
3. Your Railway project URL (if created)

I'll help you fix it! 🚀

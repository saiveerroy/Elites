# Deploy Elites Project to Render or Railway

## 📋 Prerequisites for Both Platforms

1. **GitHub Repository** - Push your code to GitHub
2. **MySQL Database** - Use a managed database service:
   - [Render PostgreSQL](https://render.com/docs/databases) (Recommended)
   - Or external MySQL host (PlanetScale, Railway, etc.)
3. **Accounts:**
   - [Render.com](https://render.com)
   - [Railway.app](https://railway.app)

---

## 🚀 RENDER DEPLOYMENT

### Step 1: Prepare Your Git Repository

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Set Up MySQL Database on Render

1. Go to [render.com](https://render.com)
2. **Create New** → **Database** → **MySQL**
3. Fill in:
   - **Name:** `elites-db`
   - **Database:** `ecommerce`
   - **Username:** `root`
   - **Region:** Choose closest to you
4. Click **Create Database**
5. Copy the connection details (you'll need these)

### Step 3: Create Tables in Render MySQL

After database is created:
1. Click on your database
2. Go to **Connections** tab
3. Copy the connection string
4. Use MySQL Workbench or command line:

```bash
mysql -h <host> -u <username> -p
# Enter password

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

### Step 4: Deploy Backend to Render

1. Go to [render.com](https://render.com) Dashboard
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Fill in settings:
   - **Name:** `elites-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid if needed)

5. Click **Advanced** and add Environment Variables:
   ```
   DB_HOST=your-database-host
   DB_USER=root
   DB_PASSWORD=your-password
   DB_NAME=ecommerce
   PORT=3000
   ```
   *(Get these values from your Render database)*

6. Click **Create Web Service**
7. Wait for deployment (shows logs)
8. Copy your backend URL: `https://elites-backend.onrender.com`

### Step 5: Deploy Frontend to Render

1. Go to **New** → **Static Site**
2. Connect your GitHub repo
3. Fill in:
   - **Name:** `elites-frontend`
   - **Build Command:** `cd frontend-react && npm run build`
   - **Publish Directory:** `frontend-react/dist`

4. Click **Advanced** and add Environment Variables:
   ```
   VITE_API_URL=https://elites-backend.onrender.com
   ```

5. Click **Create Static Site**
6. Your frontend will be live at: `https://elites-frontend.onrender.com`

---

## 🚂 RAILWAY DEPLOYMENT

### Step 1: Prepare Your Git Repository

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (recommended)
3. Create new project

### Step 3: Add MySQL Database

1. In Railway Dashboard → Start New
2. Click **Provision New** → **MySQL**
3. Wait for database to be ready
4. Click on the database and go to **Connect**
5. Copy connection details

### Step 4: Create Tables in Railway MySQL

```bash
# Get connection string from Railway
mysql -h <host> -u <username> -p

# Then run:
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
('T-Shirt', 999, 'men', 'shirts', '/images/product2.jpg', 'Cotton T-shirt');
```

### Step 5: Deploy Backend to Railway

1. In Railway Dashboard → **New Project**
2. Select **GitHub Repo** (your Elites repo)
3. Click on the service that appears
4. Go to **Settings** tab
5. Set **Start Command:**
   ```
   cd backend && node server.js
   ```

6. Go to **Variables** tab and add these Environment Variables:
   - `DB_HOST` - Copy from MySQL connection
   - `DB_USER` - Copy from MySQL connection  
   - `DB_PASSWORD` - Copy from MySQL connection
   - `DB_NAME=ecommerce`
   - `PORT=3000` (Railway assigns automatically, but set to be safe)

7. Go to **Deployments** and trigger deployment
8. Click on your service and go to **Settings** → **Railway Domain**
9. Your backend URL will be shown (e.g., `https://elites-backend.up.railway.app`)

### Step 6: Deploy Frontend to Railway

1. In the same Railway project, click **New Service**
2. Choose **GitHub Repo** → select your repo
3. Set **Root Directory:** `frontend-react`
4. Set **Build Command:**
   ```
   npm run build
   ```
5. Set **Start Command:**
   ```
   npm preview
   ```
   Or use a static server:
   ```
   npx serve -s dist -l 3000
   ```

6. Go to **Variables** and add:
   ```
   VITE_API_URL=https://your-backend-url.up.railway.app
   ```

7. Deploy and get your frontend URL

---

## ⚙️ Environment Variables Quick Reference

### Backend (.env)
```
DB_HOST=your-database-host
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=ecommerce
PORT=3000
```

### Frontend (.env.local)
```
VITE_API_URL=https://your-deployed-backend-url
```

---

## 🔗 Connect Frontend to Backend

After deploying both:

1. **Get your backend URL** from Render/Railway dashboard
2. **Update frontend environment variable:**
   - For Render: Set `VITE_API_URL` in Static Site environment variables
   - For Railway: Set `VITE_API_URL` in Service variables
3. **Redeploy frontend** to apply changes

---

## ✅ Verify Deployment

### Test Backend
```bash
# Replace with your backend URL
curl https://your-backend-url/test
# Should return: {"message":"Server is working"}
```

### Test API
```bash
curl https://your-backend-url/products
# Should return JSON array of products
```

### Test Frontend
- Visit your frontend URL
- Should load and display products from backend

---

## 🆘 Troubleshooting

### "Cannot connect to database" on Render/Railway
- ✅ Verify database credentials in environment variables
- ✅ Check database is created and has tables
- ✅ Ensure your IP/service has database access
- ✅ For Railway: MySQL might need a few minutes to be ready

### "CORS error" or "Cannot fetch products"
- ✅ Check `VITE_API_URL` is set to correct backend URL
- ✅ Verify backend URL has no trailing slash
- ✅ Redeploy frontend after changing `VITE_API_URL`

### Frontend shows blank/loading forever
- ✅ Open browser DevTools → Network tab
- ✅ Check if API requests are being made
- ✅ Verify backend is responding: `curl https://backend-url/test`

### 404 on frontend but backend works
- ✅ For Render: Check "Publish Directory" is set to `frontend-react/dist`
- ✅ For Railway: Check build command correctly builds to `dist` folder

---

## 💡 Recommendation

**For this project, I recommend:**
- **Backend:** Render or Railway (both free tier available)
- **Database:** Use Railway MySQL (easier integration) or Render PostgreSQL
- **Frontend:** Render Static Site (simpler) or Railway (more control)

**Most Popular Setup:** Railway for both backend + database (all in one dashboard)

---

## Cost
- **Render:** Free tier available ($0 for first month, then $7+/month)
- **Railway:** $5 free credit/month, then pay-as-you-go
- Both have generous free tiers for small projects

---

## Failed Deployments?

Check logs:
- **Render:** Dashboard → Your service → **Logs** tab
- **Railway:** Dashboard → Your service → **Deployments** tab → Click deployment → **Build/Deploy logs**

Common errors:
- `Error: Cannot find module 'express'` → Run `npm install` in your build
- `Error: connect ECONNREFUSED` → Database not accessible, check credentials
- `Port already in use` → Render/Railway assigns port automatically, don't hardcode 3000

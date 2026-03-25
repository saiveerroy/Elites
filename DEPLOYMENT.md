# Deployment Guide for Elites E-commerce

## Prerequisites

1. **Node.js** (v14+) and npm
2. **MySQL Server** running locally or remotely
3. Database called `ecommerce` created

## Local Development Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend-react
npm install
```

### 2. Start MySQL Server

**On Windows:**
```bash
# Start MySQL service via Services app or:
net start MySQL80  # (or your MySQL version)
```

**On Mac:**
```bash
brew services start mysql
```

**On Linux:**
```bash
sudo systemctl start mysql
```

### 3. Create Database & Tables

```bash
mysql -u root -p
# Enter password when prompted, then run:

CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

# Create products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  image VARCHAR(500),
  description TEXT
);

# Add sample data
INSERT INTO products (name, price, category, subcategory, image, description) VALUES
('Nike Shoes', 5999, 'footwear', 'sports', '/images/product1.jpg', 'High quality Nike shoes'),
('T-Shirt', 999, 'men', 'shirts', '/images/product2.jpg', 'Cotton T-shirt');

EXIT;
```

### 4. Run Backend

```bash
cd backend
npm install  # Install dotenv if not already done
node server.js
```

You should see:
```
MySQL Connected
Routes registered
Server running on port 3000
```

### 5. Run Frontend (in another terminal)

```bash
cd frontend-react
npm run dev
```

Visit `http://localhost:5173` (or whatever Vite shows)

---

## Deployment Options

### Option A: Deploy to Vercel (Recommended for Frontend)

1. **Frontend Deployment:**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy frontend
   cd frontend-react
   vercel
   ```

2. **Set Environment Variable in Vercel Dashboard:**
   - Add `VITE_API_URL` = your backend URL

### Option B: Deploy to Render (For Backend)

1. **Prepare Backend:**
   ```bash
   cd backend
   # Ensure package.json has start script
   ```

2. **Update `backend/package.json`:**
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

3. **Push to GitHub and connect on Render:**
   - Create new Web Service
   - Select your GitHub repo
   - Set Build Command: `npm install`
   - Set Start Command: `npm start`
   - Add environment variables:
     ```
     DB_HOST=your-mysql-host
     DB_USER=your-db-user
     DB_PASSWORD=your-db-password
     DB_NAME=ecommerce
     PORT=3000
     ```

4. **Update Frontend Environment:**
   - In Vercel, set `VITE_API_URL` to your Render backend URL

### Option C: Deploy Both on Same Server (AWS/DigitalOcean)

1. **SSH into your server**
2. **Install Node.js and MySQL**
3. **Clone your repo**
4. **Install PM2 for process management:**
   ```bash
   npm install -g pm2
   ```

5. **Start Backend with PM2:**
   ```bash
   cd backend
   pm2 start server.js --name "elites-backend"
   pm2 save
   pm2 startup
   ```

6. **Build Frontend:**
   ```bash
   cd frontend-react
   npm run build
   ```

7. **Serve Frontend with Nginx:**
   ```bash
   sudo apt install nginx
   # Configure nginx to serve frontend and proxy /api to backend
   ```

---

## Troubleshooting

### Backend won't start
- **Check MySQL is running:** `mysql -u root -p` (should connect)
- **Check credentials in `.env`:** Match your actual MySQL login
- **Check database exists:** `mysql -u root -p -e "SHOW DATABASES;"`

### Frontend shows "Cannot fetch products"
- **Check backend is running:** Visit `http://localhost:3000/test` in browser
- **Check CORS is enabled** in backend (already done ✓)
- **Check API URL:** Should be `http://localhost:3000` for local dev
- **Check `.env.local`:** Should have `VITE_API_URL=http://localhost:3000`

### Database connection errors
- Ensure MySQL service is running
- Verify DB credentials match `.env` file
- Create missing database/tables

---

## Quick Start Command

```bash
# Terminal 1: Start MySQL (if needed)
# Terminal 2: Start Backend
cd backend && npm install && node server.js

# Terminal 3: Start Frontend
cd frontend-react && npm install && npm run dev
```

Then visit `http://localhost:5173`

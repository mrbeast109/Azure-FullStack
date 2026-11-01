# AZURE E-commerce — Full Stack Setup Guide

## Architecture

```
ecommerceWebsite/
├── backend/              ← Node.js + Express API
│   ├── config/db.js      ← MongoDB connection
│   ├── controllers/      ← Business logic
│   ├── middleware/       ← Auth (JWT) + Upload (Multer)
│   ├── models/           ← Mongoose schemas (User, Product, Order)
│   ├── routes/           ← REST API routes
│   ├── scripts/          ← One-time seed script
│   ├── uploads/          ← Uploaded product images (auto-created)
│   ├── .env              ← ⚠️ Fill in your MONGO_URI here
│   └── server.js         ← Entry point
└── src/                  ← React frontend (Vite)
    ├── context/AuthContext.jsx   ← Updated to use JWT API
    ├── services/api.js           ← Central API client
    └── components/               ← All UI unchanged
```

---

## Step 1 — MongoDB Atlas Setup

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free cluster
2. Create a database user (Settings → Database Access)
3. Whitelist your IP (Network Access → Allow from Anywhere: `0.0.0.0/0`)
4. Click **Connect → Connect your application** and copy the connection string
5. It looks like: `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

---

## Step 2 — Configure Backend `.env`

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://yourUser:yourPassword@cluster0.xxxxx.mongodb.net/azure_ecommerce?retryWrites=true&w=majority
JWT_SECRET=azure_ecommerce_super_secret_jwt_key_2024
NODE_ENV=development
```

> Replace `MONGO_URI` with your actual Atlas connection string and add `azure_ecommerce` as the database name.

---

## Step 3 — Start the Backend

```bash
cd backend
npm run dev       # Uses nodemon for hot reload
# OR
npm start         # Production start
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 AZURE Backend running on http://localhost:5000
```

---

## Step 4 — Seed the Database (one time)

```bash
cd backend
node scripts/seedProducts.js
```

This inserts all 35 products from the static data file into MongoDB Atlas.

---

## Step 5 — Start the Frontend

```bash
# From project root (ecommerceWebsite/)
npm run dev
```

Frontend runs on `http://localhost:5173` and connects to the backend at `http://localhost:5000/api`.

---

## API Endpoints

### Auth
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register |
| POST | `/api/auth/login` | Public | Login (returns JWT) |
| GET | `/api/auth/me` | Protected | Get profile |

### Products
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/products` | Public | List all (filter by `?category=&badge=&collection=&search=`) |
| GET | `/api/products/:id` | Public | Get one by `_id` or numeric `productId` |
| POST | `/api/products` | Admin | Create (supports file upload) |
| PUT | `/api/products/:id` | Admin | Update |
| DELETE | `/api/products/:id` | Admin | Delete |
| POST | `/api/products/seed` | Admin | Bulk seed from JSON array |

### Orders
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/orders` | Protected | Place order |
| GET | `/api/orders/my` | Protected | My order history |
| GET | `/api/orders/:id` | Protected | Single order |
| GET | `/api/orders` | Admin | All orders |
| PUT | `/api/orders/:id/status` | Admin | Update status |

---

## Making a User an Admin

In MongoDB Atlas, open the `users` collection and change:
```json
{ "role": "admin" }
```
for the desired user document. Then they can access all admin API routes.

---

## Uploading Product Images

When creating/updating products via the admin API, send `multipart/form-data` with:
- `image` — single primary image file
- `images` — multiple additional image/video files (up to 10)

Uploaded files are served from `http://localhost:5000/uploads/<filename>`.

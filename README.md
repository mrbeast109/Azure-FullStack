# AZURE ecommerce website

A full-stack fashion e-commerce site built with React on the frontend and Node.js/Express on the backend, with MongoDB Atlas as the database.

The site includes a product catalog with filtering, a cart drawer, product detail pages with image galleries, user authentication, and a checkout flow that saves orders to the database.

---

## Tech Stack

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool and dev server |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Styling |
| GSAP | 3 | Animations |
| Lucide React | — | Icons |
| EmailJS | 4 | Contact form emails |

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| Node.js | — | Runtime |
| Express | 4 | Web server |
| Mongoose | 8 | MongoDB object modelling |
| bcryptjs | 2 | Password hashing |
| jsonwebtoken | 9 | JWT authentication |
| multer | 1 | File uploads |
| dotenv | 16 | Environment variables |
| nodemon | 3 | Dev auto-restart |

### Database

MongoDB Atlas — cloud-hosted MongoDB. Stores users, products, and orders.

---

## Project Structure

```
ecommerceWebsite/
├── frontend/
│   ├── src/
│   │   ├── components/       pages and UI components
│   │   ├── context/          auth and theme context
│   │   ├── crartDrawer/      cart state and drawer UI
│   │   ├── card/             product card components
│   │   ├── data/             static product fallback data
│   │   ├── services/api.js   all backend API calls
│   │   └── utils/            scroll reveal utility
│   ├── .env
│   ├── index.html
│   └── package.json
└── backend/
    ├── config/db.js          MongoDB connection
    ├── controllers/          request handlers
    ├── middleware/           JWT auth, file upload
    ├── models/               User, Product, Order schemas
    ├── routes/               API route definitions
    ├── scripts/              database seed script
    ├── .env
    └── server.js
```

---

## Prerequisites

- Node.js 18 or higher
- A MongoDB Atlas account (free tier works)

---

## MongoDB Atlas Setup

1. Sign in at [cloud.mongodb.com](https://cloud.mongodb.com) and create a new cluster
2. Under **Network Access**, add your IP address (or `0.0.0.0/0` to allow all)
3. Under **Database Access**, create a user with read and write permissions
4. Click **Connect**, choose **Drivers**, and copy the connection string
5. Replace `<password>` in the string with your database user's password

---

## Environment Variables

**backend/.env**

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=pick_a_long_random_string
NODE_ENV=development
```

**frontend/.env**

```
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Project

You need two terminals running at the same time.

**Terminal 1 — Backend**

```bash
cd backend
npm install
npm run dev
```

The API starts at `http://localhost:5000`.

**Terminal 2 — Frontend**

```bash
cd frontend
npm install
npm run dev
```

The site opens at `http://localhost:5173`.

---

## Seeding the Database

After the backend connects to Atlas successfully, run this once to load the product catalog:

```bash
cd backend
node scripts/seedProducts.js
```

This inserts all products using upsert, so it is safe to run more than once.

---

## API Routes

### Auth

```
POST   /api/auth/signup      register a new account
POST   /api/auth/login       log in, returns a JWT
GET    /api/auth/me          get the logged-in user's profile  (requires JWT)
```

### Products

```
GET    /api/products         list all products (supports ?category= &badge= &search=)
GET    /api/products/:id     single product by MongoDB id or numeric productId
POST   /api/products         create a product  (admin only)
PUT    /api/products/:id     update a product  (admin only)
DELETE /api/products/:id     delete a product  (admin only)
POST   /api/products/seed    bulk seed from a JSON array  (admin only)
```

### Orders

```
POST   /api/orders           place an order  (requires JWT)
GET    /api/orders/my        list the current user's orders  (requires JWT)
GET    /api/orders/:id       get a single order  (requires JWT)
GET    /api/orders           list all orders  (admin only)
PUT    /api/orders/:id/status  update order status  (admin only)
```

---

## Making a User an Admin

In MongoDB Atlas, open the `users` collection and change the `role` field for that document from `"user"` to `"admin"`. Admin accounts can create, update, and delete products, and manage all orders.

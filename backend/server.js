require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

if (process.env.CLIENT_URL) {
  const clientUrl = process.env.CLIENT_URL.trim();
  if (clientUrl.startsWith('http://') || clientUrl.startsWith('https://')) {
    allowedOrigins.push(clientUrl);
  } else {
    allowedOrigins.push(`https://${clientUrl}`);
    allowedOrigins.push(`http://${clientUrl}`);
  }
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or same-origin
    if (!origin) return callback(null, true);

    try {
      const parsedOrigin = new URL(origin);
      const isExplicitlyAllowed = allowedOrigins.includes(origin);
      const isRenderDomain = parsedOrigin.hostname.endsWith('.onrender.com');
      const isLocalhost = /^(localhost|127\.0\.0\.1)$/.test(parsedOrigin.hostname);

      if (isExplicitlyAllowed || isRenderDomain || isLocalhost) {
        return callback(null, true);
      }
    } catch {
      // If URL parsing fails, check literal inclusion
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date() });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\nBackend running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

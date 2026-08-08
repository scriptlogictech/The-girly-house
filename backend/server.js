const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =======================
// Database Connection
// =======================
require("./config/db");

// =======================
// CORS Configuration
// =======================

const allowedOrigins = [
  "http://localhost:5173",
  "https://thegirlyhouse.com",
  "https://www.thegirlyhouse.com",
  "https://the-girly-house.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// =======================
// Middleware
// =======================

app.use(express.json());

// =======================
// Routes
// =======================

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const couponRoutes = require("./routes/couponRoutes");
const orderRoutes = require("./routes/orderRoutes");

// =======================
// API Routes
// =======================

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/orders", orderRoutes);

// =======================
// Default Route
// =======================

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// =======================
// Server
// =======================

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
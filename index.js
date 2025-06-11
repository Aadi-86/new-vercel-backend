import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Productrouter } from "./App/routes/admin/product.routes.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());

// Get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (only works locally or on Railway/Render)
app.use("/images", express.static(path.join(__dirname, "App/upload/images")));

// Routes
app.use("/api/products", Productrouter);

// Root route
app.get("/", (req, res) => {
  res.send("soo ja bhai");
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ Connected to Database");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

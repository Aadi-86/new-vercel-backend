import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Productrouter } from "../App/routes/admin/product.routes.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "../App/upload/images"))); // updated path
app.use("/api/products", Productrouter);

app.get("/", (req, res) => {
  res.send("soo ja bhai (Vercel 🦄)");
});

// MongoDB connect (but without app.listen)
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB from Vercel Function");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

export default app;

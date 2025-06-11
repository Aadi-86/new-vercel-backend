import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Productrouter } from "./App/routes/admin/product.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static("./App/upload/images"));
app.use("/api/products", Productrouter);
app.get("/",(req,res)=>{
  res.send("soo ja bhai")
})
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to Database");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

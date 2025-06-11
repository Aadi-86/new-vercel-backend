import express from "express";
import upload from "../../middleware/upload.js";
import { addProduct, displayAllProduct, Login, newCollection, productRemove, Signup, uploadImage } from "../../controller/admin/Product.controller.js";
const Productrouter = express.Router();

Productrouter.post("/upload", upload.single("product"), uploadImage);
Productrouter.post("/addproduct",addProduct)
Productrouter.post("/removeProduct",productRemove)
Productrouter.get("/Allproduct",displayAllProduct)
Productrouter.post("/signup",Signup)
Productrouter.post("/login",Login)
Productrouter.get("/newCollection",newCollection)
export { Productrouter};

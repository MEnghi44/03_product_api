import express from "express";
const router = express.Router();
import Product from "../models/product.js";

/**
 * C = post
 * R = get ==> Get all / Get by id
 * U = put
 * D = delete
 */
 
router.get("/", (req, res) => {
  res.send("RestfulAPI");
});

 //Get all
 //http://localhost:5000/api/products
router.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


 //Get By id
 //http://localhost:5000/api/products/61cd6b7d0b1404a00194737c
router.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
});

 //Create new Product
 //http://localhost:5000/api/products
router.post("/products", async (req, res) => {
    const payload = req.body;
    const product = new Product(payload);
    await product.save();
    res.json({message:"Proucts added !!"});
});

 //put 
 //http://localhost:5000/api/products/61cd6baf0b1404a00194737e
router.put("/products/:id", async(req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const product = await Product.findByIdAndUpdate(id,{ $set: payload });
  res.json({message:`Product Id ${id} is Update`});
});
 
//Delete By Id
//http://localhost:5000/api/products/61cd6b7d0b1404a00194737c
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({message:`Product Id ${id} is deleted`});
});

export default router;
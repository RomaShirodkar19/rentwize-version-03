import express from 'express';
const productRouter = express.Router();
import {Product} from '../model/product.js'
 


productRouter.get("/", async (req, res) => {
        try {
          const products = await Product.find({});
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ message: "Failed to fetch products" });
        }

});


productRouter.get("/:id", async (req, res) => {
   
        try {
          const product = await Product.findById(req.params.id);
          if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }
          res.status(200).json(product);
        } catch (error) {
          res.status(500).json({ message: "Failed to fetch product info" });
        }
      
});


export default productRouter;

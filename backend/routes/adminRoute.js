import express from 'express';
const adminRouter = express.Router();
import {Product} from '../model/product.js'
import adminMiddleware from '../middleware/admin.js'; 



adminRouter.post("/addproduct", adminMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body); 
    await newProduct.save(); 
    res.status(201).json(newProduct); 
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error.message }); 
  }
});

adminRouter.put("/updateproduct/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true 
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" }); 
    }

    res.status(200).json(updatedProduct); 
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message }); 
  }
});

adminRouter.delete("/deleteproduct/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedProduct = await Product.findByIdAndDelete(id); 

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" }); 
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct }); 
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
});







export default adminRouter;

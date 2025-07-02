const ProductModel = require("../models/productModel");
const productModel = new ProductModel();

class ProductController {
  async addProduct(req, res) {
    try {
      const newProduct = await productModel.addProduct(req.body);
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Failed to add product" });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productModel.getProductById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to get product" });
    }
  }

  async updateProduct(req, res) {
    try {
      const updated = await productModel.updateProduct(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Product not found" });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const result = await productModel.deleteProduct(req.params.id);
      res.status(200).json({ message: "Product deleted", products: result });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const kind = req.params.kind;
      const products = await productModel.getProductsByCategory(kind);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to get products by category" });
    }
  }
}

module.exports = new ProductController();

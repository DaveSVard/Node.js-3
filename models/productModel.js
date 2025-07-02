const fs = require("fs/promises");
const path = require("path");

class ProductModel {
  constructor() {
    this.productsFilePath = path.join(__dirname, "../products.json");
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.productsFilePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async addProduct(productData) {
    const products = await this.getProducts();
    const id = Date.now();
    products.push({ ...productData, id });
    await fs.writeFile(
      this.productsFilePath,
      JSON.stringify(products, null, 2)
    );
    return productData;
  }

  async getProductById(productId) {
    const products = await this.getProducts();
    return products.find((product) => product.id === Number(productId));
  }

  async updateProduct(productId, newData) {
    const idToUpdate = Number(productId);
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === idToUpdate);
    if (index === -1) return null;

    products[index] = { ...products[index], ...newData, id: idToUpdate };
    await fs.writeFile(
      this.productsFilePath,
      JSON.stringify(products, null, 2)
    );
    return products[index];
  }

  async deleteProduct(productId) {
    const idToDelete = Number(productId);
    const products = await this.getProducts();
    const filtered = products.filter((product) => product.id !== idToDelete);
    await fs.writeFile(
      this.productsFilePath,
      JSON.stringify(filtered, null, 2)
    );
    return filtered;
  }

  async getProductsByCategory(kind) {
    const products = await this.getProducts();
    return products.filter((product) => product.category === kind);
  }
}

module.exports = ProductModel;

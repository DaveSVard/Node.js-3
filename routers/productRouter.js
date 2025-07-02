const controller = require("../controllers/productsController");
const express = require("express");
const productRouter = express.Router();

productRouter.post("/", controller.addProduct);
productRouter.get("/:id", controller.getProductById);
productRouter.delete("/:id", controller.deleteProduct);
productRouter.put("/:id", controller.updateProduct);
productRouter.get("/category/:kind", controller.getProductsByCategory);

module.exports = { productRouter };

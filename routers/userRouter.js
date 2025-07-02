const controller = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/", controller.addUser);
userRouter.get("/:id", controller.getUserById);
userRouter.delete("/:id", controller.deleteUser);
userRouter.put("/:id", controller.updateUser);

module.exports = { userRouter };

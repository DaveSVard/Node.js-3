const UserModel = require("../models/userModel");

const userModel = new UserModel();

class UserController {
  async addUser(req, res) {
    try {
      const savedUser = await userModel.addUser(req.body);
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to add user" });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const user = await userModel.getSingleUser(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const result = await userModel.deleteUser(userId);

      res.status(200).json({ message: "User deleted", users: result });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }

  async updateUser(req, res) {
    try {
      const updated = await userModel.updateUser(req.params.id, req.body);

      if (!updated) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }
}

module.exports = new UserController();

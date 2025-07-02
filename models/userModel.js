const path = require("path");
const fs = require("fs/promises");

class UserModel {
  constructor() {
    this.usersJsonFilePath = path.join(__dirname, "../users.json");
  }

  async getUsers() {
    try {
      const data = await fs.readFile(this.usersJsonFilePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async addUser(userData) {
    const users = await this.getUsers();
    const id = Date.now();
    users.push({ ...userData, id: id });
    await fs.writeFile(this.usersJsonFilePath, JSON.stringify(users, null, 2));

    return users;
  }

  async getSingleUser(userId) {
    const users = await this.getUsers();
    const foundUserById = users.find((elm) => elm.id === userId);

    return foundUserById;
  }

  async deleteUser(userId) {
    const users = await this.getUsers();
    const filteredUsers = users.filter((elm) => elm.id !== Number(userId));

    await fs.writeFile(
      this.usersJsonFilePath,
      JSON.stringify(filteredUsers, null, 2)
    );

    return filteredUsers;
  }

  async updateUser(userId, newUserData) {
    const users = await this.getUsers();

    const index = users.findIndex((user) => user.id === Number(userId));
    if (index === -1) {
      return null;
    }

    users[index] = { ...users[index], ...newUserData, id: Number(userId) };

    await fs.writeFile(this.usersJsonFilePath, JSON.stringify(users, null, 2));
    return users[index];
  }
}

module.exports = UserModel;

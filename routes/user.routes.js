const express = require("express");

const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const { userExists } = require("../middlewares/users.middlewares");
const { userValidators } = require("../middlewares/validators.middlewares");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", userValidators, createUser);
userRouter.patch("/:id", userExists, updateUser);
userRouter.delete("/:id", userExists, deleteUser);

module.exports = { userRouter };

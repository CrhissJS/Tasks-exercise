const express = require("express");

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStatus,
} = require("../controllers/tasks.controller");

const { taskExists } = require("../middlewares/tasks.middlewares");

const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:status", getTasksByStatus);
taskRouter.post("/", createTask);
taskRouter.patch("/:id", taskExists, updateTask);
taskRouter.delete("/:id", taskExists, deleteTask);

module.exports = { taskRouter };

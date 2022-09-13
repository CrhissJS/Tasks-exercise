const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: [
        "id",
        "userId",
        "title",
        "startDate",
        "limitDate",
        "finishDate",
        "status",
      ],
      include: { model: User, attributes: ["id", "name", "email", "status"] },
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const getTasksByStatus = async (req, res) => {
  try {
    const allStatus = ["active", "late", "cancelled", "completed"];
    const { status } = req.params;
    if (allStatus.includes(status)) {
      const tasks = await Task.findAll({
        where: { status },
      });
      res.status(200).json({
        status: "success",
        data: {
          tasks,
        },
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "This status doesn't exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;
    const newTask = await Task.create({
      title,
      userId,
      startDate,
      limitDate,
    });
    res.status(201).json({
      status: "success",
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { task } = req;
    const { finishDate } = req.body;
    if (task.status === "active") {
      const newTask = await task.update({ finishDate });
      const theLimitDate = Date.parse(task.limitDate);
      const theFinishDate = Date.parse(finishDate);
      if (theLimitDate >= theFinishDate) {
        newTask.update({ status: "completed" });
      } else {
        newTask.update({ status: "late" });
      }
      res.status(200).json({
        status: "success",
        data: { newTask },
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "This task was already updated",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;
    await task.update({ status: "cancelled" });
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStatus,
};

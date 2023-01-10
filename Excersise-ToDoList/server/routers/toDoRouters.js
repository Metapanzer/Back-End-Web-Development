const express = require("express");
const Router = express.Router();

const { toDoControllers } = require("../controllers");
Router.get("/", toDoControllers.showList);
Router.post("/create", toDoControllers.createTask);
Router.patch("/edit/:id/", toDoControllers.editTask);
Router.delete("/delete/:id/", toDoControllers.deleteTask);

module.exports = Router;

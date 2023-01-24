//Import dependencies
const express = require("express");
const Router = express.Router();

//import toDoControllers logic
const { toDoControllers } = require("../controllers"); //refer to index.js inside controllers folder
//Create each route for different method
Router.get("/", toDoControllers.showList); //.showlist refer to module.exports inside toDoController.js etc.
Router.post("/create", toDoControllers.createTask);
Router.patch("/edit/:id/", toDoControllers.editTask);
Router.delete("/delete/:id/", toDoControllers.deleteTask);

//Export all router as module to be imported in index.js file inside routers folder
module.exports = Router;

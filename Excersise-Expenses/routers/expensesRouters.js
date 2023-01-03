const express = require("express");
const Router = express.Router();

//Import controller
const { expensesController } = require("../controllers");

Router.get("/list", expensesController.getList);
Router.get("/:id/", expensesController.getDetails);
Router.post("/create", expensesController.create);
Router.put("/edit/:id/", expensesController.edit);
Router.delete("/delete/:id/", expensesController.delete);
Router.get("/", expensesController.getTotalByCriteria);

module.exports = Router;

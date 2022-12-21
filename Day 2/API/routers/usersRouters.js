const express = require("express");
const Router = express.Router();

//Import controller
const { usersController } = require("../controllers");

Router.post("/register", usersController.register);
Router.get("/login", usersController.login);

module.exports = Router;

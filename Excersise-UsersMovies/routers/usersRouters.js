const express = require("express");
const Router = express.Router();

//Import controller
const { usersController } = require("../controllers");

Router.get("/login", usersController.login);
Router.post("/register", usersController.register);

module.exports = Router;

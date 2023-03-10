const express = require("express");
const Router = express.Router();

//Import controller
const { usersController } = require("../controllers");

Router.get("/get", usersController.getUsers);
Router.post("/post", usersController.postUsers);

module.exports = Router;

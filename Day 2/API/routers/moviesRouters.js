const express = require("express");
const Router = express.Router();

//Import controller
const { moviesController } = require("../controllers");

Router.get("/search", moviesController.searchBy);

module.exports = Router;

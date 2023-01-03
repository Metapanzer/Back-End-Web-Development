const express = require("express");
const Router = express.Router();

//Import controller
const { moviesController } = require("../controllers");

//Set route to match how path will be declared
Router.get("/get-all", moviesController.getMovies);
//Set route for query method
Router.get("/get", moviesController.getFiltered);

module.exports = Router;

const express = require("express");
const Router = express.Router();

const { passengerControllers } = require("../controllers");

Router.get("/", passengerControllers.searchBy);

module.exports = Router;

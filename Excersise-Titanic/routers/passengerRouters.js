const express = require("express");
const Router = express.Router();

const { passengerControllers } = require("../controllers");

Router.get("/", passengerControllers.searchBy);
Router.get("/search", passengerControllers.searchByName);
Router.get("/alive", passengerControllers.getTotalAlive);
Router.get("/info", passengerControllers.getTotalAliveByGender);
module.exports = Router;

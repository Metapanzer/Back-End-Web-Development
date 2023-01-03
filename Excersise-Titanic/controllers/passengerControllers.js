const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports = {
  searchBy: async (req, res) => {
    try {
      const PClass = req.query.PClass;
      let getData = await query(
        `SELECT * FROM passengers WHERE Survived=1 AND PClass=${PClass}`
      );
      res.status(200).send({
        isError: "False",
        message: `Search Passenger by PClass: ${PClass}`,
        data: getData,
      });
    } catch (error) {}
  },
  searchByName: async (req, res) => {
    try {
      const name = req.query.name;

      let getName = await query(
        `SELECT * FROM passengers WHERE Name LIKE '%${name}%'`
      );

      res.status(200).send({
        isError: "False",
        message: `Search Passenger by Name: ${name}`,
        data: getName,
      });
    } catch (error) {}
  },
  getTotalAlive: async (req, res) => {
    try {
      let getSurvived = await query(
        "SELECT COUNT(*) as Total_Survived FROM passengers WHERE Survived=1"
      );
      res.status(200).send({
        isError: "False",
        message: "Get Total Survived Passengers Success!",
        data: getSurvived,
      });
    } catch (error) {}
  },
  getTotalAliveByGender: async (req, res) => {
    try {
      let getSurvivedByGender = await query(
        "SELECT COUNT(*) as Total_Survived, Sex FROM passengers WHERE Survived=1 GROUP BY Sex"
      );
      res.status(200).send({
        isError: "False",
        message: "Get Total Survived by Sex Success!",
        data: getSurvivedByGender,
      });
    } catch (error) {}
  },
};

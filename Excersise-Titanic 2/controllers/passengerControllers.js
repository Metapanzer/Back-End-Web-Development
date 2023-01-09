const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports = {
  searchBy: async (req, res) => {
    const ticketNumber = req.query.ticket;
    const age = req.query.age;
    const sex = req.query.sex;
    const name = req.query.name;

    try {
      if (ticketNumber) {
        let getData = await query(
          `SELECT * FROM passengers WHERE Ticket LIKE '%${ticketNumber}%'`
        );
        res.status(200).send({
          isError: "False",
          message: `Search Passenger by Ticket Number: ${ticketNumber}`,
          data: getData,
        });
      }

      if (age && sex) {
        let getData = await query(
          `SELECT * FROM passengers WHERE Age=${age} AND Sex='${sex}'`
        );
        res.status(200).send({
          isError: "False",
          message: `Search Passenger by Age: ${age} and Sex: ${sex}`,
          data: getData,
        });
      }

      if (name && age) {
        let getData = await query(
          `SELECT * FROM passengers WHERE Name LIKE '%${name}%' AND Age='${age}'`
        );

        res.status(200).send({
          isError: "False",
          message: `Search Passenger by Name: ${name} and Age: ${age}`,
          data: {
            name: getData[0].Name,
            Sex: getData[0].Sex,
            Survived: getData[0].Survived.toString()
              .replace(1, "life")
              .replace(0, "pass away"),
          },
        });
      }
    } catch (error) {}
  },
};

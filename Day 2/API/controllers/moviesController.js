const fs = require("fs");
module.exports = {
  searchBy: async (req, res) => {
    try {
      //Step 1-Ambil value dari query
      let data = req.query;
      for (let key in data) {
        data[key] = data[key].replace(/%/g, " ");
      }
      //   Step 2-Ambil data dari db.json
      let { movies } = JSON.parse(fs.readFileSync("./db/db.json"));
      if (data.status) {
        movies = movies.filter((value) => {
          return value.status.toLowerCase() === data.status.toLowerCase();
        });
      }

      if (data.location) {
        movies = movies.filter((value) => {
          return value.location.toLowerCase() === data.location.toLowerCase();
        });
      }

      if (data.time) {
        movies = movies.filter((value) => {
          return value.time.toLowerCase() === data.time.toLowerCase();
        });
      }

      res.status(201).send({
        isError: "false",
        message: "Search Movies Success",
        data: movies,
      });

      res.status(404).send({
        isError: "true",
        message: "Movies Not Found!",
        data: null,
      });
    } catch (error) {}
  },
};

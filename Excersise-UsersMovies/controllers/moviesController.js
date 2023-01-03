const fs = require("fs");

module.exports = {
  getFiltered: (req, res) => {
    //Get query data from URI
    const status = req.query.status?.replace("%", " ");
    const time = req.query.time?.replace("%", " ");
    const location = req.query.location;

    //Get movies data from db.json
    let { movies } = JSON.parse(fs.readFileSync("./db/db.json"));
    //Filter movies data using query
    let moviesFiltered = movies;

    if (status) {
      moviesFiltered = moviesFiltered.filter(
        (movie) => movie.status.toLowerCase() === status
      );
    }
    if (time) {
      moviesFiltered = moviesFiltered.filter((movie) => movie.time === time);
    }
    if (location) {
      moviesFiltered = moviesFiltered.filter(
        (movie) => movie.location.toLowerCase() === location
      );
    }
    //Show filtered movies as response  to client
    res.status(201).send({
      isError: false,
      message: "Get Filtered Movie Data Success",
      data: moviesFiltered,
    });
  },

  getMovies: (req, res) => {
    //Get movies data from db.json
    let { movies } = JSON.parse(fs.readFileSync("./db/db.json"));
    //Send movies data as response to client
    res.status(201).send({
      isError: false,
      message: "Get Movie Data Success",
      data: movies,
    });
  },
};

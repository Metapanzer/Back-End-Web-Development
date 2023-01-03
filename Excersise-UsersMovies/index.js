const express = require("express");
// const { usersRouter } = require("./REST/routers");
const app = express();
app.use(express.json()); //Initialize body parser --> untuk menerima request.body dari

const PORT = 5000;

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Our API<h1>");
});

//Import Router
const { usersRouter, moviesRouter } = require("./routers");
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log("API Running on port" + PORT));

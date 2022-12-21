const express = require("express");
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

// import express from "express";

// const PORT = 8000;
// const app = express();

// app.get("/api", (req, res) => res.send("Hi, there this is express.js API"));
// app.listen(PORT, () => console.log(PORT));

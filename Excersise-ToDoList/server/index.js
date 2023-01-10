//ExpressJS Setup
const express = require("express");
const app = express();
app.use(express.json());

//Define PORT and response for default route
const PORT = 5000;
app.get("/", (req, res) => {
  res.status(201).send("<h1>Welcome to API<h1>");
});
//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Import router for controller
const { toDoRouters } = require("./routers");
app.use("/todo", toDoRouters);

//Run the API
app.listen(PORT, () => console.log("API running on Port: " + PORT));

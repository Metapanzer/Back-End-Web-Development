//Import ExpressJS dependencies
const express = require("express");
const app = express();

//Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

//Define PORT and response for default route
const PORT = 5000;
app.get("/", (req, res) => {
  res.status(201).send("<h1>Welcome to API<h1>");
});

//CORS (granting access from different network (front end to back end))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Import router for controller from index.js inside routers folder
const { toDoRouters } = require("./routers"); //refer to index.js in routers folder
app.use("/todo", toDoRouters);

//Run the API
app.listen(PORT, () => console.log("API running on Port: " + PORT));

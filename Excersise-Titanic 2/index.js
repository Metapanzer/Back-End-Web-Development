const express = require("express");
const app = express();
app.use(express.json());

const PORT = 5000;
app.get("/", (req, res) => {
  res.status(201).send("<h1>Welcome to API<h1>");
});

const { passengerRouters } = require("./routers");
app.use("/passenger", passengerRouters);

app.listen(PORT, () => console.log("API running on Port: " + PORT));

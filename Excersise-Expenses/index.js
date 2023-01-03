const express = require("express");
const app = express();
app.use(express.json()); //Initialize body parser --> untuk menerima request.body dari postman

const PORT = 5000;

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Our API<h1>");
});

//Import Router
const { expensesRouter } = require("./routers");
app.use("/expense", expensesRouter);

app.listen(PORT, () => console.log("API Running on port" + PORT));

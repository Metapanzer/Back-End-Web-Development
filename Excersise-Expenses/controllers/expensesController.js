const fs = require("fs");
let fullData = JSON.parse(fs.readFileSync("./db/db.json"));

module.exports = {
  getList: async (req, res) => {
    try {
      const { expenses } = JSON.parse(fs.readFileSync("./db/db.json"));

      if (expenses.length === 0) {
        return res.status(404).send({
          isError: "true",
          message: "Data not Found!",
          data: null,
        });
      }

      res.status(201).send({
        isError: "false",
        message: "Expenses List Generated!",
        data: expenses,
      });
    } catch (error) {}
  },

  getDetails: async (req, res) => {
    try {
      let category = req.params;

      let { expenses } = JSON.parse(fs.readFileSync("./db/db.json"));

      if (category.id) {
        expenses = expenses.filter((value) => {
          return value.id === parseInt(category.id);
        });
      }

      if (expenses.length === 0) {
        return res.status(404).send({
          isError: "true",
          message: "Data not Found!",
          data: null,
        });
      }

      res.status(201).send({
        isError: "false",
        message: "Expenses List Generated!",
        data: expenses,
      });
    } catch (error) {}
  },

  create: async (req, res) => {
    try {
      let data = req.body;

      const getData = JSON.parse(fs.readFileSync("./db/db.json"));

      let id = { id: getData.expenses.at(-1).id + 1 };
      data = { ...id, ...data };
      getData.expenses.push(data);
      fs.writeFileSync("./db/db.json", JSON.stringify(getData));

      res.status(201).send({
        isError: "false",
        message: "Expense added!",
        data: getData.expenses,
      });
    } catch (error) {}
  },

  edit: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newData = req.body;
      const getData = JSON.parse(fs.readFileSync("./db/db.json"));

      if (getData.expenses[id - 1]?.id === id) {
        getData.expenses[id - 1].name = newData.name;
        getData.expenses[id - 1].nominal = newData.nominal;
        getData.expenses[id - 1].category = newData.category;
        getData.expenses[id - 1].date = newData.date;
      } else {
        return res.status(404).send({
          isError: "true",
          message: "Expense ID not found!",
          data: null,
        });
      }
      fs.writeFileSync("./db/db.json", JSON.stringify(getData));

      // getData.expenses.forEach((value, arr) => {
      //   if (value.id === id) {
      //     value.name = newData.name;
      //     value.nominal = newData.nominal;
      //     value.category = newData.category;
      //     value.date = newData.date;
      //     return arr;
      //   }
      // });

      res.status(201).send({
        isError: "false",
        message: "Edit success!",
        data: getData.expenses,
      });
    } catch (error) {}
  },

  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      let getData = JSON.parse(fs.readFileSync("./db/db.json"));
      if (getData.expenses[id - 1]?.id !== id) {
        return res.status(404).send({
          isError: "true",
          message: "Expense ID not found!",
          data: null,
        });
      }
      getData.expenses = getData.expenses.filter((value) => value.id !== id);
      fs.writeFileSync("./db/db.json", JSON.stringify(getData));

      res.status(201).send({
        isError: "false",
        message: "Delete success!",
        data: getData,
      });
    } catch (error) {}
  },

  //Get total expenses by date
  getTotalByCriteria: async (req, res) => {
    const selectedDate = req.query.date;
    const selectedCategory = req.query.category;

    if (selectedDate) {
      let filteredByDate = fullData.expenses.filter((element) => {
        return (
          element.date >= selectedDate[0] && element.date <= selectedDate[1]
        );
      });
      let totalExpensesByDate = 0;
      filteredByDate.map((item) => (totalExpensesByDate += item.nominal));
      res.status(201).send({
        isError: "false",
        message: `Show total expenses from ${selectedDate[0]} to ${selectedDate[1]}`,
        totalExpensesByDate,
      });
    }
    if (selectedCategory) {
      let totalExpensesByCategory = 0;
      fullData.expenses.map((item) => {
        if (item.category.toLowerCase() === selectedCategory) {
          return (totalExpensesByCategory += item.nominal);
        }
      });
      res.status(201).send({
        isError: "false",
        message: `Show total expenses from ${selectedCategory}`,
        totalExpensesByCategory,
      });
    }
  },
};

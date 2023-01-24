//Import dependencies
const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports = {
  showList: async (req, res) => {
    try {
      const getList = await query("SELECT * FROM todo_items");

      res.status(200).send({
        isError: "False",
        message: "Show todo List Success!",
        data: getList,
      });
    } catch (error) {
      res.status(404).send({
        isError: "True",
        message: error.message,
        data: null,
      });
    }
  },
  createTask: async (req, res) => {
    try {
      const { Description } = req.body;

      await query(
        `INSERT INTO todo_items (Description) VALUE ('${Description}')`
      );

      const getList = await query("SELECT * FROM todo_items");

      res.status(201).send({
        isError: "False",
        message: "Create New Task Success!",
        data: getList,
      });
    } catch (error) {
      res.status(404).send({
        isError: "True",
        message: error.message,
        data: null,
      });
    }
  },
  editTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { Description, Completed } = req.body;

      if (Description) {
        await query(
          `UPDATE todo_items SET Description='${Description}' WHERE id='${id}'`
        );
      } else {
        await query(
          `UPDATE todo_items SET Completed='${Completed}'  WHERE id='${id}'`
        );
      }

      const getList = await query("SELECT * FROM todo_items");
      res.status(200).send({
        isError: "False",
        message: `Task ${id} Successfully Edited!`,
        data: getList,
      });
    } catch (error) {
      res.status(404).send({
        isError: "True",
        message: error.message,
        data: null,
      });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;

      await query(`DELETE FROM todo_items WHERE id=${id}`);
      const getList = await query("SELECT * FROM todo_items");
      await query(
        `ALTER TABLE todo_items AUTO_INCREMENT=${getList.length + 1}`
      );

      res.status(200).send({
        isError: "False",
        message: `Task ${id} Deleted!`,
        data: getList,
      });
    } catch (error) {
      res.status(404).send({
        isError: "True",
        message: error.message,
        data: null,
      });
    }
  },
};

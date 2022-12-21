const fs = require("fs");
module.exports = {
  register: async (req, res) => {
    try {
      //Step 1-Ambil value dari client dan menyiapkan UID
      let data = req.body;
      let UID = Date.now();
      //Step 2-Validasi username
      if (data.username.length < 5)
        return res.status(404).send({
          isError: true,
          message: "Username must be more than 5 character",
          data: null,
        });
      //Step 3-Ambil data dari db.json
      let getData = JSON.parse(fs.readFileSync("./db/db.json"));
      //Step 4-Gabungkan data dengan UID
      getData.users.push({ UID, ...data });
      //Step 5-post data ke server
      fs.writeFileSync("./db/db.json", JSON.stringify(getData));
      //Step 6-Berikan response
      res.status(201).send({
        UID,
        username: req.body.username,
        email: req.body.email,
      });
    } catch (error) {}
  },
  login: async (req, res) => {
    try {
      //Step 1-Ambil value dari client
      let { username, password } = req.query;
      //Step 2-Ambil data dari db.json
      let { users } = JSON.parse(fs.readFileSync("./db/db.json"));
      //Step 3-Filter data untuk dicocokan dengan db.json
      let dataToSend = [];
      users.forEach((value) => {
        if (value.username === username && value.password === password)
          return dataToSend.push(value);
      });
      if (dataToSend.length === 0)
        return res.status(404).send({
          isError: false,
          message: "Login Failed",
          data: null,
        });

      //Step 4-Response
      res.status(201).send({
        isError: false,
        message: "Login Success",
        data: {
          UID: dataToSend[0].UID,
          username: dataToSend[0].username,
          email: dataToSend[0].email,
        },
      });
    } catch (error) {}
  },
};

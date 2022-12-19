const fs = require("fs");
module.exports = {
  getUsers: (req, res) => {
    console.log("masuk userscontroller");
    //Step 1-Mengambil data dari db.json
    //Jika ingin dimanipulasi bisa di step ini
    let { users } = JSON.parse(fs.readFileSync("./db/db.json"));
    console.log(users);
    //Step 2-Kirim data ke client
    res.status(201).send({
      isError: false,
      message: "Get Data Success",
      data: users,
    });
  },
  postUsers: (req, res) => {
    //Step 1-Ambil data dari client
    let data = req.body;
    //Step 2-Simpan data client di db.json
    let getData = JSON.parse(fs.readFileSync("./db/db.json"));

    getData.users.push(data);

    fs.writeFileSync("./db/db.json", JSON.stringify(getData));

    //Step 3-Kirim response
    res.status(201).send({
      isError: false,
      message: "Post Data Success",
      data: JSON.parse(fs.readFileSync("./db/db.json")),
    });
  },
};

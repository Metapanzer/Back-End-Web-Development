const fs = require("fs");
module.exports = {
  login: (req, res) => {
    let data = req.body;
    console.log(data);
    //Step 1-Mengambil data dari db.json
    //Jika ingin dimanipulasi bisa di step ini
    let { users } = JSON.parse(fs.readFileSync("./db/db.json"));

    let userData;
    for (let user of users) {
      if (user.username === data.username && user.password === data.password) {
        userData = user;
        break;
      }
    }
    console.log(users);
    //Step 2-Kirim data ke client
    res.status(201).send({
      isError: false,
      message: "Get Data Success",
      data: userData,
    });
  },
  register: (req, res) => {
    //Step 1-Ambil data dari client
    let data = req.body;

    //Step 2-Ambil data existing di db.json
    let getData = JSON.parse(fs.readFileSync("./db/db.json"));

    //Step 3-Simpan data client di db.json
    let addID = { UID: Date.now() };
    Object.assign(addID, data);
    getData.users.push(addID);

    fs.writeFileSync("./db/db.json", JSON.stringify(getData));
    const { UID, username, email } = getData.users.at(-1);
    const registered = { UID, username, email };

    //Step 4-Kirim response
    res.status(201).send({
      isError: false,
      message: "Post Data Success",
      data: registered,
    });
  },
};

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "childtherap",
});

app.post("/signup", (req, res) => {

  console.log("here");
  // First, check if the phone number already exists in the database
  const phoneCheckSql = "SELECT * FROM user WHERE phone = ?";
  const phoneToCheck = req.body.phone; // Change to req.body.phone

  db.query(phoneCheckSql, [phoneToCheck], (phoneCheckErr, phoneCheckData) => {
    if (phoneCheckErr) {
      return res.json(phoneCheckErr);
    }

    // If there is a user with the same phone number, return a message
    if (phoneCheckData.length > 0) {
      console.log("Phone number already registered");
      return res.json("phone");
    }

    // If the phone number is not found in the database, proceed with registration
    const sql = "INSERT INTO user (`name`, `phone`, `password`) VALUES (?)"; // Update to insert phone
    const values = [req.body.name, req.body.phone, req.body.password]; // Change email to phone

    db.query(sql, [values], (err, data) => {
      if (err) {
        return res.json(err);
      }

      return res.json("success");
    });
  });
});


app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE `phone` = ? AND `password` = ?"; // Change email to phone

  db.query(sql, [req.body.phone, req.body.password], (err, data) => { // Change email to phone

    if (err) {
      return res.json(err);
    }

    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json("error");
    }
  });
});



const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

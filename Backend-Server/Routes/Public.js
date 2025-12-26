const express = require("express");
const router = express.Router();
const pool = require("../Database/db");
const createResponse = require("../Utils/Response");
const jsonToken = require("jsonwebtoken");
const hashPassword = require("crypto-js");
const SECRET = require("../Utils/secret");
// login user
router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  let cryptoPassword = hashPassword.SHA256(password).toString();

  let sql = "Select * from users where email = ? and password=?";

  pool.query(sql, [email, cryptoPassword], (error, data) => {
    try {
      let payload = {
        email: data[0].email,
        role: data[0].role,
      };
      let token = jsonToken.sign(payload, SECRET);
      let newResponse = {
        email: data[0].email,
        role: data[0].role,
        token: token,
      };
      res.send(createResponse(error, newResponse));
    } catch (ex) {
      res.send("error");
    }
  });
});

// get all active courses
router.get("/courses/all-active-courses", (req, res) => {
  //logic may be wrong from database
  let sql = "Select * from courses where start_date > CURDATE()";

  pool.query(sql, (error, data) => {
    res.send(createResponse(error, data));
  });
});

module.exports = router;

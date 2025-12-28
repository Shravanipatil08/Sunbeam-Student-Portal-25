const express = require("express");
const router = express.Router();
const pool = require("../Database/db");
const createResponse = require("../Utils/Response");
const hashPassword = require("crypto-js");

// to register student
router.post("/student/register-to-course", (req, res) => {
  const { courseId, email, name, mobileNo } = req.body;

  let checkEmail = "select * from users where email=? "; //authentication
  pool.query(checkEmail, [email], (error, data) => {
    if (data[0]) {
      let sql =
        "Insert Into students(name,email,course_id,mobile_no) values (?,?,?,?)";

      pool.query(sql, [name, email, courseId, mobileNo], (error, data) => {
        res.send(createResponse(error, data));
      });
    } else {
      let password = hashPassword.SHA256("Sunbeam").toString();
      let role = "student";
      let insertEmail = "insert into users values(?,?,?)";
      pool.query(insertEmail, [email, password, role], (error, data) => {
        let sql =
          "Insert Into students(name,email,course_id,mobile_no) values (?,?,?,?)";

        pool.query(sql, [name, email, courseId, mobileNo], (error, data) => {
          res.send(createResponse(error, data));
        });
      });
    }
  });
});

router.put("/student/change-password", (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.send(createResponse("Passwords do not match", null));
  }

  const encryptedPassword = hashPassword.SHA256(newPassword).toString();

  const sql = "UPDATE users SET password = ? WHERE email = ?";
  console.log(encryptedPassword)
console.log(newPassword)
  pool.query(sql, [encryptedPassword, email], (error, data) => {
    
    res.send(createResponse(error, data));
  });
});


// get all registrated course of student
router.get("/student/my-courses", (req, res) => {
  //const email = req.query.email;
  // temp pass email from query

  const email = req.headers.email;

  let sql =
    "Select c.* from students s Inner Join courses c on s.course_id = c.course_id where s.email = ?";

  pool.query(sql, [email], (error, data) => {
    res.send(createResponse(error, data));
  });
});

// get all with videos
router.get("/student/my-courses-with-videos", (req, res) => {
  const email = req.query.email;

  let sql =
    "Select c.*,v.title,v.description,v.youtube_url,v.added_at from students s Inner Join courses c on s.course_id = c.course_id Inner join videos v on c.course_id = v.course_id where s.email = ?";

  pool.query(sql, [email], (error, data) => {
    res.send(createResponse(error, data));
  });
});

module.exports = router;
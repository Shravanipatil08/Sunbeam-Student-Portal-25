const express = require("express");
const router = express.Router();

const pool = require("../Database/db"); //database connection
const createResponse = require("../Utils/Response");
const { authorizedUser } = require("../Utils/userAuth");
//Courses API's

// get all courses
router.get("/course/all-courses", authorizedUser, (req, res) => {
  // check with correct dates from database
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  let sql = "Select * from courses where start_date >= ? AND end_date <= ?";

  pool.query(sql, [startDate, endDate], (error, data) => {
    res.send(createResponse(error, data));
  });
});

// add new course
router.post("/course/add", authorizedUser, (req, res) => {
  const { courseName, desc, fees, startDate, endDate, videoExpireDays } =
    req.body;

  let sql =
    "Insert into courses(course_name,description,fees,start_date,end_date,video_expire_days) VALUES (?,?,?,?,?,?)";

  pool.query(
    sql,
    [courseName, desc, fees, startDate, endDate, videoExpireDays],
    (error, data) => {
      res.send(createResponse(error, data));
    }
  );
});

// update course
router.put("/course/update/:courseId", authorizedUser, (req, res) => {
  const courseId = req.params.courseId;

  const { courseName, desc, fees, startDate, endDate, videoExpireDays } =
    req.body;

  let sql =
    "Update courses set course_name = ?,description = ?,fees = ?,start_date = ?,end_date = ?,video_expire_days = ? where course_id = ?";

  pool.query(
    sql,
    [courseName, desc, fees, startDate, endDate, videoExpireDays, courseId],
    (error, data) => {
      res.send(createResponse(error, data));
    }
  );
});

//delete course
router.delete("/course/delete/:courseId", authorizedUser, (req, res) => {
  const courseId = req.params.courseId;

  let sql = "Delete from courses where course_id = ?";

  pool.query(sql, [courseId], (error, data) => {
    res.send(createResponse(error, data));
  });
});

module.exports = router;

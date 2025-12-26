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

// fetch all videos
router.get("/video/all-videos", authorizedUser, (req, res) => {
  const courseId = req.query.courseId; //not fixed may have to ask

  let sql = "Select * from videos where course_id = ?";

  pool.query(sql, [courseId], (error, data) => {
    res.send(createResponse(error, data));
  });
});

// add new video
router.post("/video/add", authorizedUser, (req, res) => {
  const { courseId, title, desc, youtubeURL } = req.body;

  let sql =
    "Insert into videos(course_id,title,description,youtube_url,added_at) values (?,?,?,?,CURDATE())"; // youtube url null

  pool.query(sql, [courseId, title, desc, youtubeURL], (error, data) => {
    res.send(createResponse(error, data));
  });
});

// update video
router.put("/video/update/:videoId", authorizedUser, (req, res) => {
  const videoId = req.params.videoId;
  const { courseId, title, desc, youtubeURL } = req.body;

  let sql =
    "Update videos SET course_id = ?,title = ?,description = ?,youtube_url = ? where video_id = ?";

  pool.query(
    sql,
    [courseId, title, desc, youtubeURL, videoId],
    (error, data) => {
      res.send(createResponse(error, data));
    }
  );
});

// delete video
router.delete("/video/delete/:videoId", authorizedUser, (req, res) => {
  const videoId = req.params.videoId;

  let sql = "Delete from videos where video_id = ?";

  pool.query(sql, [videoId], (error, data) => {
    res.send(createResponse(error, data));
  });
});

// to enrolled student
router.get("/admin/enrolled-students", authorizedUser, (req, res) => {
  const courseId = req.query.courseId;

  let sql = "Select * from students where course_id = ?";

  pool.query(sql, [courseId], (error, data) => {
    res.send(createResponse(error, data));
  });
});

module.exports = router;


module.exports = router;

const express = require("express");
const router = express.Router();

const pool = require("../Database/db"); //database connection
const createResponse = require("../Utils/Response");
const { authorizedUser } = require("../Utils/userAuth");

const multer = require('multer')

// configure multer for file upload
const storage = multer.diskStorage({
  destination: "uploads/courses",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
})

const upload = multer({ storage })
//Courses API's

// get all courses
router.get("/course/all-courses", authorizedUser, (req, res) => {
  const { start_date, end_date } = req.query;

  let sql = "SELECT * FROM courses";
  let params = [];
  
  if (start_date && end_date) {
    sql += " WHERE start_date >= ? AND end_date <= ?";
    params.push(start_date, end_date);
  }

  pool.query(sql, params, (error, data) => {
    res.send(createResponse(error, data));
  });
});

// add new course
router.post("/course/add", authorizedUser, upload.single("image"), (req, res) => {
  const { courseName, desc, fees, startDate, endDate, videoExpireDays } = req.body;

  const imagePath = req.file ? `uploads/courses/${req.file.filename}` : "uploads/courses/default.png"

  let sql =
    "Insert into courses(course_name,description,fees,start_date,end_date,video_expire_days,course_image)VALUES (?,?,?,?,?,?,?)";

  pool.query(sql, [courseName, desc, fees, startDate, endDate, videoExpireDays, imagePath], (error, data) => {
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

// videos API's

// fetch all videos
router.get("/video/all-videos", authorizedUser, (req, res) => {
  const courseId = req.query.courseId;

  let sql = "Select * FROM videos"
  let params = []                                 //add

  if (courseId) {                           //added logic
    sql += " Where course_id = ?"
    params.push(courseId)
  }

  pool.query(sql, params, (error, data) => {
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
  const { title, desc, youtubeURL } = req.body;

  let sql =
    "Update videos SET title = ?,description = ?,youtube_url = ? where video_id = ?";

  pool.query(
    sql,
    [title, desc, youtubeURL, videoId],
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

// get enrolled student
router.get("/admin/enrolled-students", authorizedUser, (req, res) => {
  const courseId  = req.query.courseId;
  let sql = "SELECT s.*,c.course_name FROM students s JOIN courses c on s.course_id = c.course_id";
  let params = [];

  if (courseId) {
    sql += " WHERE s.course_id = ?";
    params.push(courseId);
  }

  pool.query(sql, params, (error, data) => {
    res.send(createResponse(error, data));
  });
});

module.exports = router;

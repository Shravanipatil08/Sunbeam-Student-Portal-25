CREATE DATABASE sunbeam_db;
USE sunbeam_db;

CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(64) NOT NULL,        
    role ENUM('admin', 'student') NOT NULL
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    fees INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    video_expire_days INT NOT NULL,
    course_image VARCHAR(255)
);

CREATE TABLE students (
    reg_no INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    course_id INT NOT NULL,
    mobile_no BIGINT NOT NULL,
    profile_pic BLOB,

    CONSTRAINT fk_students_user
        FOREIGN KEY (email)
        REFERENCES users(email)
        ON DELETE CASCADE,

    CONSTRAINT fk_students_course
        FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE
);

CREATE TABLE videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    youtube_url VARCHAR(255) NOT NULL,
    added_at DATE NOT NULL,

    CONSTRAINT fk_videos_course
        FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE
);


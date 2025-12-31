import axios from "axios";
import { port } from "./studentServices";

export async function getCourses(token) {
  const URL = `http://localhost:${port}/admin/course/all-courses`;
  const headers = { token };
  const response = await axios.get(URL, { headers });
  return response.data;
}

export async function getVideos(id, token) {
  const URL = `http://localhost:${port}/admin/video/all-videos`
  const response = await axios.get(URL, { headers: { token: token }, params: { courseId: id } })
  return response.data
}

export async function getStudent(id, token) {
  const URL = `http://localhost:${port}/admin/admin/enrolled-students`;
  const response = await axios.get(URL, {
    headers: { token: token },
    params: { courseId: id },
  });
  return response.data;
}

export async function addCourse(token, courseName, desc, fees, startDate, endDate, videoExpireDays, file) {
  const URL = `http://localhost:${port}/admin/course/add`;
  const formData = new FormData()

  formData.append("courseName", courseName)
  formData.append("desc", desc)
  formData.append("fees", fees)
  formData.append("startDate", startDate)
  formData.append("endDate", endDate)
  formData.append("videoExpireDays", videoExpireDays)
  formData.append("image", file)

  const response = await axios.post(URL, formData, { headers: { token: token } })
  return response.data
}

export async function updateCourses(token, courseName, desc, fees, startDate, endDate, videoExpireDays, courseId) {
  const URL = `http://localhost:${port}/admin/course/update/${courseId}`
  const body = { courseName, desc, fees, startDate, endDate, videoExpireDays }
  const response = await axios.put(URL, body, { headers: { token: token } })
  return response.data
}

export async function deleteCourse(token, courseId) {
  const URL = `http://localhost:${port}/admin/course/delete/${courseId}`
  const response = await axios.delete(URL, {
    headers: { token: token },
  })
  return response.data
}

export async function addVideo(token, courseId, title, youtubeURL,desc) {
  const URL = `http://localhost:${port}/admin/video/add`;
  const body = { courseId, title,  youtubeURL,desc}
  const response = await axios.post(URL, body, { headers: { token: token } })
  return response.data
}

export async function editVideo(token, title, youtubeURL, desc,videoId) {
  const URL = `http://localhost:${port}/admin/video/update/${videoId}`;
  const body = { title,youtubeURL,desc }
  const response = await axios.put(URL,body, {
    headers: { token: token }
  })
  return response.data
}

export async function deleteVideo(token, videoId) {
  const URL = `http://localhost:${port}/admin/video/delete/${videoId}`
  const response = await axios.delete(URL, {
    headers: { token: token },
  })
  return response.data
}
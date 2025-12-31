import axios from 'axios'

const port = 4000

export async function getCourses()
{
    const URL = `http://localhost:${port}/public/courses/all-active-courses`
    const response = await axios.get(URL)
    return response.data
}

export async function loginUser(email,password) 
{
    const URL = `http://localhost:${port}/public/auth/login`
    const body = {email,password}
    const response = await axios.post(URL,body)
    return response.data
}

export async function registerStudent(courseId,name,email,mobileNo) {
    const URL =  `http://localhost:${port}/students/student/register-to-course`
    const body = {courseId,name,email,mobileNo}
    const response = await axios.post(URL,body)
    return response.data
}
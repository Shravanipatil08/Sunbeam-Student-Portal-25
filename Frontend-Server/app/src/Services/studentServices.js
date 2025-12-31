import axios from 'axios'

export const port = 4000

export async function getProfile(token)
{
    const URL = `http://localhost:${port}/students/student/get-profile`
    const headers = {token}
    const response =  await axios.get(URL,{headers})
    return response.data
}
export async function getMyCourses(token)
{
    const URL = `http://localhost:${port}/students/student/my-courses`
    const headers = {token}
    const response =  await axios.get(URL,{headers})
    return response.data
}

export async function getMyCoursesWithVideos(email,token)
{  
    const URL = `http://localhost:${port}/students/student/my-courses-with-videos`
    const response=await axios.get(URL,{params:{email},headers:{token:token}  })
    return response.data
}

export async function updatePassword(token,newPassword,confirmPassword,email) {
     const URL = `http://localhost:${port}/students/student/change-password`
     const body = {email,newPassword,confirmPassword}
     const response = await axios.put(URL,body,{headers:{token:token}})
     return response.data
}
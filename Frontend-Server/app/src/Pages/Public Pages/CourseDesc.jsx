import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useNavigate, useParams } from 'react-router'
import { getCourses } from '../../Services/publicServices'
import '../Public Pages/CourseDesc.css'
import { port } from '../../Services/studentServices'


function CourseDesc() {

    const {id} = useParams();
    const navigate = useNavigate()
    const [course,setCourse] = useState()

    useEffect(()=> {
        loadCourse()
    },[])

    const loadCourse = async() => {
        const response = await getCourses();
        if(response.status == "success")
        {
            const selected = response.data.find(c => c.course_id === Number(id));
            setCourse(selected)
        }
    }

    if(!course){
        return(
            <div className="course-page">
                <Navbar/>
                <p style={{padding:'40px'}}>Loading....</p>
            </div>
        )
    }

  return (
    <div className='course-page mx-3 my-3'>
      <Navbar/>

      <div className="course-container">
        <div className="course-image">
            <img src={`http://localhost:${port}/${course.course_image}`} alt="mern"/>
        </div>
        <div className="course-details">
            <h2><b>{course.course_name}</b></h2>
            <h6 className='mt-1 mb-3' style={{color:'gray'}}>{course.description}</h6>
            <p><b>Start Date: </b>{new Date(course.start_date).toLocaleDateString()}</p>
            <p><b>End Date: </b>{new Date(course.end_date).toLocaleDateString()}</p>
            <p><b>Fees: </b>{course.fees} Rs /-</p>
            <button className='register-btn btn-success' onClick={() => navigate(`/registerStudent/${course.course_id}`)}>
            Register to Course
        </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDesc

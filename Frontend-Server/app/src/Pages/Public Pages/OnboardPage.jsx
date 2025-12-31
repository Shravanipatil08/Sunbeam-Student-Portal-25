import React, { useEffect, useState } from 'react'
// import logo from '../../assets/react.svg'
import { Link } from 'react-router'
import { getCourses } from '../../Services/publicServices'
import Navbar from '../../Components/Navbar'
import { port } from '../../Services/studentServices'

function OnboardPage() {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        getAllCourses()
    }, [])

    const getAllCourses = async () => {
        const response = await getCourses()
        if (response.status == "success") {
            setCourses(response.data)
        }
    }

    return (
        <>
            <Navbar />
            <div className='mx-3 my-3 shadow' style={{ border: '2px solid #f5f5f5', borderRadius: '20px', background: 'var(--linear-grad-body)' }}>
                <p className='text-center heading mt-3'>Available Courses</p>
                <div className="d-flex flex-wrap justify-content-center">
                    {courses.map((e) => {
                        return <div className="card shadow-sm mx-5 my-3 mt-3" style={{ width: '19rem', background: 'var(--linear-grad-cb)', borderRadius: '20px' }}>
                            <div className="card-image mt-2">
                                <div className="card-image-box">
                                    <img alt="Course Image" src={`http://localhost:${port}/${e.course_image}`} />
                                </div>
                            </div>

                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <p style={{ border: '1px solid black' }}></p>
                                <h5 className="card-title" style={{ fontSize: '1.5rem' }}>{e.course_name}</h5>
                                <p>Starts on:{new Date(e.start_date).toLocaleDateString()}</p>
                                <Link to={`/course/${e.course_id}`} className="link-btn mt-1">View More</Link>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default OnboardPage

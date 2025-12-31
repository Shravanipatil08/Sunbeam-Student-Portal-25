import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { getStudent } from '../../Services/adminServices'
import { getCourses } from '../../Services/publicServices'
import { useAuth } from '../../context/userAuth'



function EnrollStudent() {

    const [courses, setCourses] = useState([])
    const [student, setStudent] = useState([])
    const [selectedCourse, setSelectedCourse] = useState("Select Course")
    const { auth } = useAuth()

    useEffect(() => {
        if (auth.token) {
            loadCourses()
            loadStudent()
        }
    }, [auth.token])


    const loadCourses = async () => {
        const response = await getCourses(auth.token)
        console.log(response)
        if (response.status == "success") {
            setCourses(response.data)
        }
    }


    const loadStudent = async (id) => {
        const response = await getStudent(id, auth.token)
        console.log(response)
        if (response.status == "success") {

            setStudent(response.data)
        }
    }
    if (!student || !courses) {
        return (
            <div className="container">
                <Navbar />
                <p>Loading</p>
            </div>
        )
    }
    return (
        <div>
            <Navbar />
            <div
                className="mx-3 my-3"
                style={{
                    border: '2px solid #f5f5f5',
                    borderRadius: '20px',
                    background: 'var(--linear-grad-cb)'
                }}
            >
                <h3 className="page-title mt-4">Enroll Student</h3>

                <div className="container table-div">
                    <div className="filter-row">

                        <div className="dropdown mb-3">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                            >
                                {selectedCourse}
                            </button>

                            <div className="dropdown-menu">
                                <button
                                    className="dropdown-item"
                                    onClick={() => {
                                        setSelectedCourse("All Courses")
                                        loadStudent("")
                                    }}
                                >
                                    All Courses
                                </button>

                                {courses.map(course => (
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            setSelectedCourse(course.course_name)
                                            loadStudent(course.course_id)
                                        }}
                                    >
                                        {course.course_name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <table className="table register-info-table">
                            <thead className="thead-dark">
                                <tr>
                                    <td>Reg No</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Course</td>
                                    <td>Mobile No</td>
                                </tr>
                            </thead>

                            <tbody>
                                {student.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted">
                                            No records found
                                        </td>
                                    </tr>
                                ) : (
                                    student.map(s => (
                                        <tr key={s.reg_no}>
                                            <td>{s.reg_no}</td>
                                            <td>{s.name}</td>
                                            <td>{s.email}</td>
                                            <td>{s.course_name}</td>
                                            <td>{s.mobile_no}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnrollStudent

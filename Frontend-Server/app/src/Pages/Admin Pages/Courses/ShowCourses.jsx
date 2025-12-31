import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { getCourses } from '../../../Services/publicServices'
import { useAuth } from '../../../context/userAuth'
import './ShowCourses.css'
import { useNavigate } from 'react-router'
import { deleteCourse } from '../../../Services/adminServices'
import Swal from 'sweetalert2'


function ShowCourses() {
    const [course, setCourses] = useState([])
    const navigate = useNavigate()
    const { auth } = useAuth()

    useEffect(() => {
        if(auth.token)
            loadCourses()
    }, [auth.token])

    const loadCourses = async () => {
        const response = await getCourses(auth.token)
        console.log(response)
        if (response.status == "success") {
            setCourses(response.data)
        }
    }

   const deleteCourses = async (id) => {

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This course will be permanently deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33'
    })
const loadCourses = async () => {
    Swal.fire({
        title: 'Loading courses...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })

    try {
        const response = await getCourses(auth.token)

        if (response.status === "success") {
            setCourses(response.data)
            Swal.close()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: response.message || 'Unable to load courses'
            })
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Could not fetch courses. Try again later.'
        })
    }
}

    if (!result.isConfirmed) return

    Swal.fire({
        title: 'Deleting...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })

    try {
        const response = await deleteCourse(auth.token, id)

        if (response.status === "success") {
            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'Course deleted successfully',
                timer: 1500,
                showConfirmButton: false
            })

            loadCourses()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: response.message || 'Unable to delete course'
            })
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Something went wrong. Try again later.'
        })
    }
}


    if (!course) {
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
            <div className="mx-3 my-3 vh-100" style={{ border: '2px solid #f5f5f5', borderRadius: '20px', background: 'var(--linear-grad-cb)' }}>
                <h3 className="table-title text-center">Registered Courses</h3>

                <div className='main-div'>
                    <table className="table register-info-table container">
                        <thead className='thead-dark'>
                            <tr>
                                <td>ID</td>
                                <td>Course Name</td>
                                <td>Description</td>
                                <td>Fee</td>
                                <td>Start Date</td>
                                <td>End Date</td>
                                <td>Expire Days</td>
                                <td>Action</td>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                course.length === 0 ?
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted">
                                            No records found
                                        </td>
                                    </tr>:
                                    course.map(e => {
                                        return (
                                            <tr>
                                                <td>{`${e.course_id}`}</td>
                                                <td>{`${e.course_name}`}</td>
                                                <td>{`${e.description}`}</td>
                                                <td>{`${e.fees}`}</td>
                                                <td>{`${new Date(e.start_date).toLocaleDateString()}`}</td>
                                                <td>{`${new Date(e.end_date).toLocaleDateString()}`}</td>
                                                <td>{`${e.video_expire_days}`}</td>
                                                <td>
                                                    <div className="action-btn-group">
                                                        <button className="action-btn edit-btn" title="Edit" onClick={() => navigate("/updateCourse", { state: e })}>
                                                            ✏️
                                                        </button>
                                                        <button className="action-btn delete-btn" title="Delete" onClick={() => deleteCourses(e.course_id)}>
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ShowCourses

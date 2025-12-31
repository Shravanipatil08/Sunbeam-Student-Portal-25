import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { updateCourses } from '../../../Services/adminServices'
import { useAuth } from '../../../context/userAuth'
import { useNavigate, useLocation } from 'react-router'
import './UpdateCourse.css'
import Swal from 'sweetalert2'


function UpdateCourse() {

    const { auth } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    const [courseId, setCourseId] = useState('')
    const [course, setCourse] = useState('')
    const [desc, setDesc] = useState('')
    const [fees, setFees] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [videoDate, setVideoDate] = useState('')

   useEffect(() => {
    if (!auth.token) return

    if (!state) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Access',
            text: 'Please select a course to update'
        }).then(() => {
            navigate("/showCourses")
        })
        return
    }

    setCourseId(state.course_id)
    setCourse(state.course_name)
    setDesc(state.description)
    setFees(state.fees)
    setStartDate(state.start_date?.slice(0, 10))
    setEndDate(state.end_date?.slice(0, 10))
    setVideoDate(state.video_expire_days)

}, [state])


    const updateCourse = async (e) => {
    e.preventDefault()

    if (!course || !fees || !startDate || !endDate) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing fields',
            text: 'Please fill all required fields'
        })
        return
    }

    Swal.fire({
        title: 'Updating course...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })

    try {
        const response = await updateCourses(
            auth.token,
            course,
            desc,
            fees,
            startDate,
            endDate,
            videoDate,
            courseId
        )

        if (response.status === "success") {
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: 'Course updated successfully',
                timer: 1500,
                showConfirmButton: false
            })

            setTimeout(() => {
                navigate("/showCourses")
            }, 1500)

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: response.message || 'Unable to update course'
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


    return (
        <div>
            <Navbar />

            <div className="mx-3 my-3 main-body">
                <h3 className="page-title mt-4">Update Courses</h3>

                <form className="container" onSubmit={updateCourse}>
                    <input className="form-control" value={course} onChange={e => setCourse(e.target.value)} />
                    <input className="form-control mt-2" value={desc} onChange={e => setDesc(e.target.value)} />
                    <input className="form-control mt-2" value={fees} onChange={e => setFees(e.target.value)} />
                    <input type="date" className="form-control mt-2" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    <input type="date" className="form-control mt-2" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    <input className="form-control mt-2" value={videoDate} onChange={e => setVideoDate(e.target.value)} />

                    <button type="submit" className="btn btn-primary mt-3">
                        Update Course
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCourse

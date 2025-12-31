import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { useAuth } from '../../../context/userAuth'
import { addVideo, getCourses } from '../../../Services/adminServices'
import './AddVideo.css'
import Swal from 'sweetalert2'

function AddVideo() {

    const { auth } = useAuth()

    const [course, setCourse] = useState('')
    const [video, setVideo] = useState('')
    const [url, setURL] = useState('')
    const [desc, setDesc] = useState('')
    const [selectedCourse, setSelectedCourse] = useState([])

    useEffect(() => {
        if (auth.token) {
            loadCourses()
        }
    }, [auth.token])

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
            setSelectedCourse(response.data)
            Swal.close()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Unable to load courses'
            })
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Could not fetch courses'
        })
    }
}


   const addNewVideo = async (e) => {
    e.preventDefault()

    if (!course || !video || !url) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Fields',
            text: 'Please fill all required fields'
        })
        return
    }

    Swal.fire({
        title: 'Adding video...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })

    try {
        const response = await addVideo(
            auth.token,
            course,
            video,
            url,
            desc
        )

        if (response.status === "success") {
            Swal.fire({
                icon: 'success',
                title: 'Video Added',
                timer: 1500,
                showConfirmButton: false
            })

            setCourse('')
            setVideo('')
            setURL('')
            setDesc('')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: response.message || 'Unable to add video'
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
                <h3 className="page-title mt-4">Add Video</h3>

                <form className="container">

                    <div className="form-group">
                        <label>Course</label>
                        <select
                            className="form-control"
                            value={course}
                            onChange={e => setCourse(e.target.value)}
                        >
                            <option value="">Select Course</option>
                            {
                                selectedCourse.map(e => (
                                    <option value={e.course_id}>
                                        {e.course_name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Video Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={video}
                            onChange={e => setVideo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>YouTube URL</label>
                        <input
                            type="text"
                            className="form-control"
                            value={url}
                            onChange={e => setURL(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={addNewVideo}>
                        Add Video
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddVideo

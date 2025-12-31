import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { editVideo } from '../../../Services/adminServices'
import { useNavigate, useLocation } from 'react-router'
import './EditVideo.css'
import { useAuth } from '../../../context/userAuth'
import Swal from 'sweetalert2'


function EditVideo() {

    const { auth } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    const [videoId, setVideoId] = useState('')
    const [course, setCourse] = useState('')
    const [video, setVideo] = useState('')
    const [url, setURL] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
    if (!auth.token) return

    if (!state) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Access',
            text: 'Please select a video to edit'
        }).then(() => {
            navigate('/showVideos')
        })
        return
    }

    setVideoId(state.video_id || '')
    setCourse(state.course_id || '')
    setVideo(state.title || '')
    setURL(state.youtube_url || '')
    setDesc(state.description || '')

}, [state, navigate])


    const updateVideo = async () => {

    if (!video || !url) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Fields',
            text: 'Video title and URL are required'
        })
        return
    }

    Swal.fire({
        title: 'Updating video...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })

    try {
        const response = await editVideo(
            auth.token,
            video,
            url,
            desc,
            videoId
        )

        if (response.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: 'Video updated successfully',
                timer: 1500,
                showConfirmButton: false
            })

            setTimeout(() => {
                navigate('/showVideos')
            }, 1500)

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: response.message || 'Unable to update video'
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
                <h3 className="page-title mt-4">Edit Video</h3>

                <div className="container">

                    <div className="form-group">
                        <label>Course ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={course}
                            disabled
                        />
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

                    <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={updateVideo}
                    >
                        Update Video
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditVideo

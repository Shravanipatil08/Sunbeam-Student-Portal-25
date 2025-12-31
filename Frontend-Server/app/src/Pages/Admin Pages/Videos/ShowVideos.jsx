import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { deleteVideo, getVideos } from '../../../Services/adminServices'
import { useAuth } from '../../../context/userAuth'
import { getCourses } from '../../../Services/publicServices'
import '../Videos/ShowVideos.css'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'


function ShowVideos() {

  const { auth } = useAuth()
  const navigate = useNavigate()

  const [videos, setVideos] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedCourseName, setSelectedCourseName] = useState("Select Course")

  useEffect(() => {
    if (auth.token) {
      loadCourses()
      loadVideos("")
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

    if (response.status === 'success') {
      setCourses(response.data)
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


  const loadVideos = async (courseId) => {
  Swal.fire({
    title: 'Loading videos...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })

  try {
    const response = await getVideos(courseId, auth.token)

    if (response.status === "success") {
      setVideos(response.data)
      Swal.close()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Unable to load videos'
      })
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Server Error',
      text: 'Could not fetch videos'
    })
  }
}


 const deleteVideos = async (id) => {

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This video will be permanently deleted',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33'
  })

  if (!result.isConfirmed) return

  Swal.fire({
    title: 'Deleting video...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })

  try {
    const response = await deleteVideo(auth.token, id)

    if (response.status === "success") {
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        timer: 1400,
        showConfirmButton: false
      })

      loadVideos("")
      setSelectedCourseName("All Courses")

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: response.message || 'Unable to delete video'
      })
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Server Error',
      text: 'Something went wrong'
    })
  }
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
        <h3 className="page-title mt-4">All Videos</h3>

        <div className="table-div">
          <div className="main-div">

            <div className="dropdown mb-3">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                {selectedCourseName}
              </button>

              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedCourseName("All Courses")
                    loadVideos("")
                  }}
                >
                  All Courses
                </button>

                {courses.map(e => (
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedCourseName(e.course_name)
                      loadVideos(e.course_id)
                    }}
                  >
                    {e.course_name}
                  </button>
                ))}
              </div>
            </div>

            <table className="table register-info-table">
              <thead className="thead-dark">
                <tr>
                  <td>ID</td>
                  <td>Course</td>
                  <td>Title</td>
                  <td>Description</td>
                  <td>YouTube URL</td>
                  <td>Added At</td>
                  <td>Action</td>
                </tr>
              </thead>

              <tbody>
                {videos.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No records found
                    </td>
                  </tr>
                ) : (
                  videos.map(v => (
                    <tr key={v.video_id}>
                      <td>{v.video_id}</td>
                      <td>{v.course_id}</td>
                      <td>{v.title}</td>
                      <td>{v.description}</td>
                      <td>{v.youtube_url}</td>
                      <td>{new Date(v.added_at).toLocaleDateString()}</td>
                      <td>
                        <div className="action-btn-group">
                          <button
                            className="action-btn edit-btn"
                            onClick={() => navigate("/editVideo", { state: v })}
                          >
                            ✏️
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => deleteVideos(v.video_id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
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

export default ShowVideos

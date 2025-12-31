import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import './Navbar.css'
import { useAuth } from '../context/userAuth'


function Navbar() {
    const [open, setOpen] = useState()

    const [coursesOpen, setCoursesOpen] = useState(false)
    const [videosOpen, setVideosOpen] = useState(false)
    const [studentsOpen, setStudentsOpen] = useState(false)

    const { auth, logout } = useAuth()
    const navigate = useNavigate()

    console.log("Navbar auth", auth)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light mt-3 mx-3" style={{ background: 'var(--linear-grad-bg)' }}>
                <div className="navbar-nav">
                    <Link className="nav-item  nav-com" to="/">Home</Link>
                    <Link className="nav-item  nav-com" to="/aboutUs">About</Link>
                </div>

                {auth.role == "student" ? (
                    <>
                        <div className="navbar-nav">
                            <Link className="nav-item  nav-com" to="/myCourses">My Courses</Link>
                        </div>
                        <div className="dropdown-wrapper">
                            <span className={`nav-com px-3 dropdown-span ${open ? "active" : ""}`} onClick={e => setOpen(!open)}><i className="fa-regular fa-user mr-1"></i>Hi {auth.user?.name}</span>
                            {
                                open && (
                                    <>
                                        <div className="dropdown-overlay" onClick={e => setOpen(false)} />
                                        <div className="dropdown-menu show shadow-sm">
                                            <Link className='dropdown-item' to={"/profilePage"}><i class="fa-regular fa-address-card mr-2" />Profile</Link>
                                            <button className='dropdown-item' onClick={e => { logout(); navigate("/") }} ><i class="fa-solid fa-arrow-right-from-bracket mr-2" />Logout</button>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                    </>
                ) : auth.role == "admin" ? (
                    <>
                        <div className="navbar-nav">
                            <Link className="nav-item  nav-com" to="/">Dashboard</Link>
                            <span className={`nav-item  nav-com ${coursesOpen ? "active" : ""} `} onClick={() => setCoursesOpen(!coursesOpen)}>Courses</span>
                            {
                                coursesOpen && (
                                    <>
                                        <div className="dropdown-overlay" onClick={e => setCoursesOpen(false)} />
                                        <div className="dropdown-menu-courses show shadow-sm">
                                            <button className='dropdown-item' onClick={() => navigate("/addCourse")}>Add Course</button>
                                            <button className='dropdown-item' onClick={() => navigate("/showCourses")}>Show Courses</button>
                                        </div>
                                    </>
                                )
                            }

                            <span className={`nav-item  nav-com ${videosOpen ? "active" : ""}`} onClick={() => setVideosOpen(!videosOpen)} >Videos</span>
                            {
                                videosOpen && (
                                    <>
                                        <div className="dropdown-overlay" onClick={e => setVideosOpen(false)} />
                                        <div className="dropdown-menu-videos show shadow-sm">
                                            <button className='dropdown-item' onClick={() => navigate("/addVideo")}>Add Video</button>
                                            <button className='dropdown-item' onClick={() => navigate("/showVideos")}>Show Videos</button>
                                        </div>
                                    </>
                                )
                            }

                            <span className={`nav-item  nav-com ${studentsOpen ? "active" : ""}}`} onClick={() => setStudentsOpen(!studentsOpen)} >Students</span>
                            {
                                studentsOpen && (
                                    <>
                                        <div className="dropdown-overlay" onClick={e => setStudentsOpen(false)} />
                                        <div className="dropdown-menu-students show shadow-sm">
                                            <button className='dropdown-item' onClick={() => navigate("/getEnrolledStudents")}>Show All Students</button>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                        <div className="dropdown-wrapper">
                            <span className={`nav-com px-3 dropdown-span ${open ? "active" : ""}`} onClick={e => setOpen(!open)}><i className="fa-regular fa-user mr-1"></i>Hi {auth.user?.name}</span>
                            {
                                open && (
                                    <>
                                        <div className="dropdown-overlay" onClick={e => setOpen(false)} />
                                        <div className="dropdown-menu show shadow-sm">
                                           
                                            <button className='dropdown-item' onClick={e => { logout(); navigate("/") }}><i class="fa-solid fa-arrow-right-from-bracket mr-2" />Logout</button>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                    </>
                ) : (
                    <div className="ms-50">
                        <Link className="nav-com nav-btn" style={{ border: 'none' }} to={"/loginPage"} >
                            <i className="fa-solid fa-arrow-right-to-bracket mr-3" />Login</Link>
                    </div>
                )
                }
            </nav>
        </div>
    )
}
export default Navbar
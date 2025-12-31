import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import '../Public Pages/RegisterPage.css'
import { getCourses, registerStudent } from '../../Services/publicServices'
import { useNavigate, useParams } from 'react-router'

function RegisterPage() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [course, setCourse] = useState()

    useEffect(() => {
        loadCourse()
    }, [])

    const loadCourse = async () => {
        const response = await getCourses();
        if (response.status == "success") {
            const selected = response.data.find(c => c.course_id === Number(id));
            setCourse(selected)
        }
    }

    if (!course) {
        return (
            <div className="course-page">
                <Navbar />
                <p style={{ padding: '40px' }}>Loading....</p>
            </div>
        )
    }

    const register = async (e) => {
        e.preventDefault()
        const response = await registerStudent(course.course_id, name, email, mobile)
        console.log(response)
        if (response.status == 'success') {
            console.log("Student Registrated")
            e.target.reset()
            navigate("/")
        }
    }

    return (
        <div>
            <Navbar />
            <div className='main-div'>
                <div className="container table-div">
                    <table className="table register-info-table">
                        <tbody>
                            <tr>
                                <th>Course Name</th>
                                <td>{`${course.course_name}`}</td>
                            </tr>
                            <tr>
                                <th>Fees (₹)</th>
                                <td>{`${course.fees}`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <form className='container card loginform p-4' style={{ borderRadius: '12px', boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)' }} onSubmit={register} >
                    <div className="form-group">
                        <label htmlFor="nameInput">Full Name</label>
                        <input type="text" className="form-control" id="nameInput" placeholder='Enter Your Name' onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailInput">Email Address</label>
                        <input type="text" className="form-control" id="emailInput" placeholder='Enter Your Email' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNoInput">Mobile Number</label>
                        <input type="text" className="form-control" id="mobileNoInput" placeholder='Enter Your Mobile Number' onChange={e => setMobile(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '40%' }}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage

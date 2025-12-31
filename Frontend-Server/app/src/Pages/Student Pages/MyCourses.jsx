import {React,useState,useEffect} from 'react'
import { getMyCourses } from '../../Services/studentServices'
import Navbar from '../../Components/Navbar'
import { useAuth } from '../../context/userAuth'
import "../Student Pages/MyCourses.css"
import { useNavigate } from 'react-router'
import { port } from '../../Services/studentServices'

function MyCourses() {

    const {auth} = useAuth()
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        if(auth.token)
            getMyRegCourses()
    }, [auth.token])

    const getMyRegCourses = async () => {
        const response = await getMyCourses(auth.token)
        console.log(auth)
        if (response.status == "success") {
            setCourses(response.data)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='mx-3 my-3 pb-3 ' style={{ border: '2px solid #f5f5f5', borderRadius: '20px', backgroundColor: 'rgb(240,246,255)' }}>
                <p className='text-center heading mt-3'>My Registered Courses</p>
                <div className="d-flex flex-wrap justify-content-center">
                    {courses.map((e) => {
                        return <div className="card shadow-sm mx-5 my-3 mt-2" style={{ width: '19rem', backgroundColor: 'white', borderRadius: '8px' }}>
                            <img className="card-img-top card-image mt-3 w-100" alt="Card image cap" src={`http://localhost:${port}/${e.course_image}`} style={{ height: '100px', width: '100px' }} />
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <p style={{ border: '1px solid black' }}></p>
                                <h5 className="card-title" style={{ fontSize: '1.5rem' }}>{e.course_name}</h5>
                                <p>Starts on:{new Date(e.start_date).toLocaleDateString()} <br/> End date:{new Date(e.end_date).toLocaleDateString()}</p>
                                <button className="link-btn mt-1" onClick={() => navigate("/viewVideo")}>View Videos</button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyCourses

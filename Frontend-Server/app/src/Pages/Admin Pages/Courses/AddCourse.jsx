import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar'
import { addCourse } from '../../../Services/adminServices'
import { useAuth } from '../../../context/userAuth'
import './AddCourse.css'
import Swal from 'sweetalert2'

function AddCourse() {
    const { auth } = useAuth()

    const [course, setCourse] = useState("")
    const [desc, setDesc] = useState("")
    const [fees, setFees] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [videoDate, setVideoDate] = useState("")
    const [file, setFile] = useState(null)

    useEffect(()=> {
        if(!auth.token) return
    },[auth.token])

    const addNewCourse = async (e) => {
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
        title: 'Adding course...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })

    try {
        const response = await addCourse(
            auth.token,
            course,
            desc,
            fees,
            startDate,
            endDate,
            videoDate,
            file
        )

        if (response.status === "success") {
            Swal.fire({
                icon: 'success',
                title: 'Course Added',
                text: 'New course has been added successfully!',
                timer: 2000,
                showConfirmButton: false
            })

            e.target.reset()
            setFile(null)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: response.message || 'Something went wrong'
            })
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Unable to add course. Try again later.'
        })
    }
}


    return (
        <div>
            <Navbar />

            <div className="mx-3 my-3">
                <h3 className="page-title mt-4">Add Courses</h3>

                <form className="container card" onSubmit={addNewCourse}>
                    <input type="text" className="form-control" placeholder="Course Name" onChange={e => setCourse(e.target.value)} />
                    <input type="text" className="form-control mt-2" placeholder="Description" onChange={e => setDesc(e.target.value)} />
                    <input type="text" className="form-control mt-2" placeholder="Fees" onChange={e => setFees(e.target.value)} />
                    <input type="date" className="form-control mt-2" onChange={e => setStartDate(e.target.value)} />
                    <input type="date" className="form-control mt-2" onChange={e => setEndDate(e.target.value)} />
                    <input type="text" className="form-control mt-2" placeholder="Video Expire Days" onChange={e => setVideoDate(e.target.value)} />
                    <input type="file" className="form-control mt-3 p-1" onChange={e => setFile(e.target.files[0])} />

                    <button type="submit" className="btn btn-primary mt-3">
                        Add Course
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCourse

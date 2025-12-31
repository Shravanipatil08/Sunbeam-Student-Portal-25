import React, { useEffect, useState } from 'react'
import { loginUser } from '../../Services/publicServices'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/userAuth'
import  '../Public Pages/LoginPage.css'

function LoginPage() {

    const { login, auth } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const signin = async () => {
        if (email == '')
            console.log("Enter Email First")
        else if (password == '')
            console.log("Password field can't be empty")
        else {
            const response = await loginUser(email, password)
            console.log(response)
            if (response.status == "success") {
                console.log(response)

                login({
                    token: response.data.token,
                    role: response.data.role,
                    user: {
                        name: response.data.name ? response.data.name.split(" ")[0] : "Admin",
                        email: response.data.email
                    }
                })
                console.log(auth)
                if (response.data.role == "student")
                    navigate("/studentHome")
                else
                    navigate("/adminHome")
            }
        }
    }

    return (
        <div className='mx-3 my-3 vh-100' style={{ border: '2px solid #f5f5f5', borderRadius: '20px',background:'var(--linear-grad-cb)' }}>
            <div className="container card my-5  px-3 py-3" style={{ width: '650px' , background:'white'}}>
                <form className='d-flex flex-column justify-content-center '>
                    <h2 className='text-center'>Login Page</h2>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword"
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={e => e.key == "Enter" ? signin() : ""} />
                    </div>
                    <button type="button" className="loginbtn" onClick={signin}>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage

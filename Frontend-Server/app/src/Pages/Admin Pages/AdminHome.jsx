import React, { useEffect } from 'react'
import OnboardPage from '../Public Pages/OnboardPage'
import { useAuth } from '../../context/userAuth'
import { getProfile } from '../../Services/studentServices'

function AdminHome() {
  const {auth} = useAuth()

  useEffect(()=>{
    if(auth.token)
      getAdminProfile()
  },[auth.token])

  const getAdminProfile = async() =>{
    const response = await getProfile(auth.token)
  }

  return (
    <div>
      <OnboardPage/>
    </div>
  )
}

export default AdminHome

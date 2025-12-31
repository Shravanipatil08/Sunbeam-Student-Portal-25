import React, { useContext, useEffect, useState } from 'react'
import OnboardPage from '../Public Pages/OnboardPage'
import { getProfile } from '../../Services/studentServices'
import { useAuth } from '../../context/userAuth'

function StudentHome() {

  const {auth} = useAuth()

  useEffect(()=>{
    if(auth.token)
      getUserProfile()
  },[auth.token])

  const getUserProfile = async () => { // add toast
    const response = await getProfile(auth.token)
  }

  return (
    <div>
      <OnboardPage/>
    </div>
  )
}

export default StudentHome

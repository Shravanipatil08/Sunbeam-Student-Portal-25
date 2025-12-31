import React from 'react'
import { useAuth } from './userAuth'
import { Navigate } from 'react-router'

function ProtectedRoutes({children,role}) {
    const {auth} = useAuth()

    if(!auth.isAuthenticated)
    {
        return <Navigate to = "/loginPage" replace/>
    }
    if(role && auth.role !== role)
    {
        return <Navigate to="/" replace/>
    }
    return children
}

export default ProtectedRoutes

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ condition, redirectPath }) => {
  const authLoading = useSelector((state) => state.loggedUser.authLoading)

  if (authLoading) return null

  return condition ? <Outlet /> : <Navigate to={redirectPath} replace />
}

export default PrivateRoute

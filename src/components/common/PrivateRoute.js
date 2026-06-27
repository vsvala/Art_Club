import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ condition, redirectPath }) => {
  return condition ? <Outlet /> : <Navigate to={redirectPath} replace />
}

export default PrivateRoute

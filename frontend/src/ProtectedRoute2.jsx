import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { Logout } from './components/Logout'
import { SignIn } from './components/SignIn'

export const ProtectedRoute2 = ({children}) => {
    let {loginCheck, setLoginCheck} = useContext(AuthContext)
  return loginCheck ? <Logout/> : children
}

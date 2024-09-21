import { useContext, useState } from 'react'
import './styles/style.css'
import { Routes, Route } from 'react-router-dom'

import { AuthContext } from './context/AuthContext'
import { FrontPage } from './components/FrontPage'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { NavbarMain } from './components/navbar/NavbarMain'
import { NavbarResponsive } from './components/navbar/NavbarResponsive'
import { Copyright } from './components/footer/Copyright'
import { Cart } from './components/cart/Cart'
import { Logout } from './components/Logout'
import { ProtectedRoute } from './ProtectedRoute'
import { ProtectedRoute2 } from './ProtectedRoute2'
import { Share } from './components/shared/Share'
import { Chat } from './components/chat/Chat'

function App() {
  let {toggleNav1, setToggleNav1} = useContext(AuthContext)

  return (
    <>
      {  !toggleNav1 ? <NavbarMain/> : <NavbarResponsive/> 
      }
      <Routes>
        <Route path='/' element={<FrontPage/>} />
        <Route path='/signup' element={<ProtectedRoute2><SignUp/></ProtectedRoute2>} />
        <Route path='/signin' element={<ProtectedRoute2><SignIn/></ProtectedRoute2>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path='/share' element={<ProtectedRoute><Share/></ProtectedRoute>} />
        <Route path='/chat' element={<ProtectedRoute><Chat/></ProtectedRoute>} />
      </Routes>
      <Copyright/>
    </>
  )
}

export default App

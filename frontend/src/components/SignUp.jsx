import React, { useContext, useEffect, useState } from 'react'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { BACKEND_URL } from '../backendURL'
import axios from 'axios'

export const SignUp = () => {
  let navigate = useNavigate()
  let { loginCheck, setLoginCheck } = useContext(AuthContext)
  let [ formDetails1, setFormDetails1 ] = useState({ username:"", email:"", password:"" })

  useEffect(()=>{
    setLoginCheck(false)
  },[])

  async function handleSubmit(e){
    e.preventDefault()
    if( formDetails1.username!="" && formDetails1.email!="" && formDetails1.password!=""){
      // console.log(formDetails1)
      let obj = { ...formDetails1 }
      try {
        let res = await axios.post(`${BACKEND_URL}/users/signup`, obj)
        console.log(res)
        setFormDetails1({username:"", email:"", password:""})
        navigate('/signin')
        
      } catch (error) {
        setLoginCheck(false)
      }
    }
  }
  return (
    <>
      <div className="loginDiv1">
        <div>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/128/6543/6543058.png" alt="image" />
                <div>
                  <p>Organization Name</p>
                  <h5>Technology &amp; Services</h5>
                </div>
            </div>
            <div>
                <div>
                   <h3>Sign Up your account</h3><br/>
                   <form onSubmit={handleSubmit}>
                    <label>username</label><br/>
                    <input type="text" value={formDetails1.username} onChange={(e)=>{ setFormDetails1({...formDetails1, username:e.target.value}) }} required /><br/><br/>
                    <label>Email Address</label><br/>
                    <input type="email" value={formDetails1.email} onChange={(e)=>{ setFormDetails1({...formDetails1, email:e.target.value}) }} required /><br/><br/>
                    <label>Password</label><br/>
                    <input type="password" value={formDetails1.password} onChange={(e)=>{ setFormDetails1({...formDetails1, password:e.target.value}) }} required /><br/><br/>
                    <button className="loginBtn">SignUp</button><br/>
                   </form>
                   <br/>
                   <p>Terms &amp; Conditions &nbsp; <b style={{color:"black"}} onClick={()=>{ navigate('/signin') }}>Sign In</b> </p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

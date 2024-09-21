import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { BACKEND_URL } from '../backendURL'

export const SignIn = () => {
  let navigate = useNavigate()
  let [ formDetails2, setFormDetails2 ] = useState({email:"", password:"" })
  let { loginCheck, setLoginCheck, access_token, setAccessToken } = useContext(AuthContext)
  async function handleSubmit(e){
    e.preventDefault()
    if(formDetails2.email!="" && formDetails2.password!=""){
      // console.log(formDetails2)
      let obj = { ...formDetails2 }
      try {
        let res = await axios.post(`${BACKEND_URL}/users/signin`,obj)
        console.log(res)
        if(res.request.status==200){
          let accessToken = res.data.accessToken
          let refreshToken = res.data.refreshToken
          // console.log({accessToken,refreshToken})
          setAccessToken(accessToken)
          setLoginCheck(true)
          setFormDetails2({ email:"", password:""})
          navigate('/logout')
        }
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
                   <h3>Sign in to your account</h3><br/>
                   <form onSubmit={handleSubmit}>
                    <label>Email Address</label><br/>
                    <input type="email" value={formDetails2.email} onChange={(e)=>{ setFormDetails2({...formDetails2, email:e.target.value}) }} required /><br/><br/>
                    <label>Password</label><br/>
                    <input type="password" value={formDetails2.password} onChange={(e)=>{ setFormDetails2({...formDetails2, password:e.target.value}) }} required /><br/><br/>
                    <button className="loginBtn">Login</button><br/>
                   </form>
                   <br/>
                   <p>Terms &amp; Conditions &nbsp;<b style={{color:"black"}} onClick={()=>{ navigate('/signup') }}>SignUp</b> </p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

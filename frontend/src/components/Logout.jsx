import React, { useContext } from 'react'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { BACKEND_URL } from '../backendURL'

export const Logout = () => {
    let navigate = useNavigate()
    let { loginCheck, setLoginCheck, access_token, setAccessToken } = useContext(AuthContext)
    async function handleLogout(){
      try {
        let instance = axios.create({
          headers : {
            Authorization : `Bearer ${access_token}`
          }
        })
        let res = await instance.get(`${BACKEND_URL}/users/logout`)
        console.log(res)
        setLoginCheck(false) ; navigate('/signin') 
      } catch (error) {
        setLoginCheck(false) ; navigate('/signin')
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
                   <h3 style={{color:"brown", fontFamily:"monospace", fontSize:"12px"}}>are you sure ? want to signout from your account !</h3><br/>
                    <button className='loginBtn' onClick={()=>{ handleLogout() }}>Logout</button>
                   <br/>
                   <p>Terms &amp; Conditions</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

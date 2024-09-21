import React, { useContext } from 'react'
import '../../styles/style.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const NavbarMain = () => {
    let navigate = useNavigate()
    let {toggleNav1, setToggleNav1} = useContext(AuthContext)
  return (
    <>
     <div className="navbar1">
        <div>
            <div>
                <img src="https://img.freepik.com/premium-photo/colorful-abstract-design-five-leaves-radial-pattern_885831-162478.jpg?ga=GA1.1.1544024129.1713298208&semt=ais_hybrid" alt="logo-image" onClick={()=>{ navigate('/') }} />
            </div>
            <div>
                <div>
                    <h3>Our Products</h3>
                    <h3>About Us</h3>
                    <h3>Contact Us</h3>
                </div>
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/128/15329/15329400.png" alt="login" onClick={()=>{ navigate('/signin') }} />
                    <img src="https://cdn-icons-png.flaticon.com/128/1170/1170576.png" alt="cart" onClick={()=>{ navigate('/cart') }} />
                </div>
            </div>
            <div>
                <button onClick={()=>{ setToggleNav1(!toggleNav1) }}>
                    <hr />
                    <hr />
                    <hr />
                </button>
            </div>
          </div>
        </div>
    </>
  )
}

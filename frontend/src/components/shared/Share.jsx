import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BACKEND_URL } from '../../backendURL'
import '../../styles/style.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export const Share = () => {
    let [ searchParam, setSearchparam ] = useSearchParams()
    let productId = searchParam.get('productId')
    console.log("product id is ",productId)
    let sharedUserId = searchParam.get('sharedUserId')
    console.log("shared user id is ", sharedUserId)
    let navigate = useNavigate()
    let { access_token, setAccessToken, loginCheck, setLoginCheck } = useContext(AuthContext)

    async function getDataObj() {
      try {
        let instance = axios.create({
          headers : {
            Authorization : `Bearer ${access_token}`
          }
        })
        let res = await instance.get(`${BACKEND_URL}/share/get?productId=${productId}&&sharedUserId=${sharedUserId}`)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      getDataObj()
    },[])
    async function handleClickShare() {
      navigate(`/chat?productId=${productId}&&sharedUserId=${sharedUserId}`)
    }
  return (
    <div className='shareDiv1'>
      <div>
      <h3> Please share the given url : (for group cart) <br /> <em style={{color:"lightskyblue"}}> {`${BACKEND_URL}/share?productId=${productId}&&sharedUserId=${sharedUserId}`} </em> </h3>
       <br /><br />
       <button className='chatBtn' onClick={handleClickShare}>Chat</button>
      </div>
    </div>
  )
}

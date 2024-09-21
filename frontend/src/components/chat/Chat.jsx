import React, { useContext, useEffect, useState } from 'react'
import '../../styles/style.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { BACKEND_URL } from '../../backendURL'

export const Chat = () => {

    let [ searchParam, setSearchparam ] = useSearchParams()
    let productId = searchParam.get('productId')
    console.log("product id is ",productId)
    let sharedUserId = searchParam.get('sharedUserId')
    console.log("shared user id is ", sharedUserId)
    let navigate = useNavigate()
    let { access_token, setAccessToken, loginCheck, setLoginCheck } = useContext(AuthContext)
    let [ objUserDetails, setObjUserDetails ] = useState({productName:"", productPrice:"", productId : productId, sharedUserId, sharedUserName:"", productImgSrc:"", otherAccountHoldersId:[], comments:[]})
    let [ showCommentBox, setShowCommentBox ] = useState(false)
    let [ msg, setMsg ] = useState("")

    async function getDataObj() {
      try {
        let instance = axios.create({
          headers : {
            Authorization : `Bearer ${access_token}`
          }
        })
        let res = await instance.get(`${BACKEND_URL}/share/get?productId=${productId}&&sharedUserId=${sharedUserId}`)
        console.log(res)
        if(res.request.status==200){
            console.log(res.data.data)
            setObjUserDetails(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      getDataObj()
    },[])

    async function handleSubmitComment(e) {
        e.preventDefault()
        let obj1 = msg
        try {
            if(obj1!=""){
                let instance = axios.create({
                    headers : {
                        Authorization : `Bearer ${access_token}`
                    }
                })
                let res = await instance.patch(`${BACKEND_URL}/share/others?sharedUserId=${sharedUserId}&&productId=${productId}`,{commentLine:obj1})
                console.log(res)
                getDataObj()
                setMsg("")
                setShowCommentBox(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
     <div className="chatDiv1">
        <div>
        <div className="handleStyleCartChatDiv1">
            <div>
                
            </div>
            <div>
                <div>
                    <img src={objUserDetails.productImgSrc} alt="product" />
                </div>
                <div>
                    <h3>{objUserDetails.productName}</h3>
                    <h4>₹{objUserDetails.productPrice}</h4>
                    <button className="cartBtn1">➕</button> <span> 1 </span> <button className="cartBtn1">➖</button>
                </div>
            </div>
        </div>
        <div className="formChatDiv1">
            <div>
                <button> 
                    {
                        !showCommentBox ? <span  onClick={()=>{ setShowCommentBox(true) }}>Write Note</span> : <span  onClick={()=>{ setShowCommentBox(false) }}>Cancel</span> 
                    }
                      </button>
            </div>
            {
                showCommentBox &&  <div>
                  <form onSubmit={handleSubmitComment}>
                    <input type="text" placeholder="Write a Note" value={msg} onChange={(e)=>{setMsg(e.target.value)}} required />
                    <button>Post</button>
                  </form>
                </div>
            }
            
        </div>
        <div className="chatUserDetailsDiv1">
            {
                objUserDetails.comments?.length>0 ?
                objUserDetails.comments.map(ele=>{
                    return(
                        <div key={ele._id}>
                            <p> <em> <b> {ele?.username} </b></em></p>
                            <p> <em> {ele?.time} </em></p>
                            <p> <em> {ele?.commentLine}</em></p>
                        </div>
                    )
                })
                : []
            }
        </div>
       </div>
    </div>
    </>
  )
}

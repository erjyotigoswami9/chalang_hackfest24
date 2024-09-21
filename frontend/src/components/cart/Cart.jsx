import React, { useContext, useEffect, useState } from 'react'
import '../../styles/style.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { BACKEND_URL } from '../../backendURL'
import { useDispatch, useSelector } from 'react-redux'
import { errorType, fetchCartData } from '../../store/actionTypes'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
    let { access_token, setAccessToken } = useContext(AuthContext)
    let navigate = useNavigate()
    let dispatch = useDispatch() ;
    let cartsData = useSelector(state=>state.cartReducer) ;
    let cartPrice = useSelector(state=>state.cartPrice) ;   

    async function getData(){
        try {
            let instance = axios.create({
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            })
            dispatch(fetchCartData({instance}))
        } catch (error) {
            console.log(error)
            dispatch(errorType())
        }
    }
    useEffect(()=>{
        getData()
    },[])

    async function handleQuantity(productId,quantity) {
        try {
            let instance = axios.create({
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            })
            let res = await instance.patch(`${BACKEND_URL}/carts/update/${productId}`,{quantity})
            console.log(res)
            dispatch(fetchCartData({instance}));
        } catch (error) {
            console.log(error)
            dispatch(errorType())
        }
    }
    async function handleClickShare(productId) {
        try {
            let instance = axios.create({
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            })
            let res = await instance.get(`${BACKEND_URL}/users/getId`)
            console.log(res)
            if (res.request.status==200){
                let userId = res.data.data.userId 
                console.log(userId)
                let res2 = await instance.post(`${BACKEND_URL}/share/create?sharedUserId=${userId}&&productId=${productId}`)
                console.log(res2)
                navigate(`/share?productId=${productId}&&sharedUserId=${userId}`)
            }
        } catch (error) {
            console.log(error) 
        }
    }
  return (
    <>
     <div className="cartListDiv1">
     <div className="cartListDiv2">
     {
            cartsData.data?.length>0 ? 
            cartsData.data && cartsData.data?.length>0 && cartsData.data?.map(item=>{
                    return(
            <div key={item._id}>
                <div>
                    <button className="deleteItemCartBtn" onClick={()=>{ handleQuantity(item.productId,0) }}>❌</button><br/><br/>
                </div>
                <div className="changeStyleDiv2">
                    <div>
                        <img src={item?.imgSrc} alt="product" />
                        <br />
                        <button className='cartBtn2' onClick={()=>{ handleClickShare(item.productId)}}>Share</button>
                    </div>
                    <div>
                        <h3>{item?.productName}</h3>
                        <h4>₹{item?.productPrice}</h4>
                        <button className="cartBtn1" onClick={()=>{ handleQuantity(item.productId,item?.quantity+1) }} >➕</button> <span> {item?.quantity} </span> <button className="cartBtn1" onClick={()=>{ handleQuantity(item.productId,item?.quantity-1) }}>➖</button>
                        <br />
                    </div>
                </div>
            </div>
            
                    )
                })
                : []
     }
        </div>
        <div style={{textAlign:"center"}}>
            <h2 style={{textAlign:"center", color:"white", fontFamily:"monospace", marginTop:"30px"}}>Total : {cartPrice.price} </h2>
            <button className='chatBtn'>Buy Now</button>
        </div>
        </div>
    </>
  )
}

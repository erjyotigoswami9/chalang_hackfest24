import React, { useContext, useEffect, useState } from 'react'
import '../../styles/style.css'
import axios from 'axios'
import { BACKEND_URL } from '../../backendURL'
import { AuthContext } from '../../context/AuthContext'

export const ProductListing = () => {
    let [ productsData, setProductsData ] = useState([])
    let [ pageNo, setPageNo ] = useState(1)
    let { access_token } = useContext(AuthContext)
    async function getData(){
        try {
            let res = await axios.get(`${BACKEND_URL}/products/all?limitNo=6&&pageNo=${pageNo}`)
            // console.log(res)
            if(res.request.status==200){
                // console.log(res.data.data)
                setProductsData(res.data.data)
            }
            else {
                setProductsData([])
            }
        } catch (error) {
            console.log(error)
            setProductsData([])
        }
    }
    useEffect(()=>{
        getData()
    },[pageNo])
    async function addItem(obj) {
        try {
            let instance = axios.create({
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            })
            let nObj = {productId:obj._id, productName: obj.name, productPrice:obj.price, imgSrc:obj.imgSrc, quantity:1}
            console.log(nObj)
            let res = await instance.post(`${BACKEND_URL}/carts/create`,nObj)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
     <div className="productMainDiv">
    <div className="productsDiv1">
        {
            productsData?.length>0 ? 
                productsData?.map(item=>{
                    return(
                        <div key={item?._id}>
                            <img src={item?.imgSrc} alt="product" />
                            <h3>{item?.name}</h3>
                            <h4>₹{item?.price}</h4>
                            <p>{item?.description}</p>
                            <button onClick={()=>{ addItem(item) }}>Add To Cart</button>
                        </div>
                    )
                })
             : []
        }
    </div>
    <div className="pageDiv1">
        <button onClick={()=>{ setPageNo(1) }}>1</button>
        <button onClick={()=>{ setPageNo(2) }}>2</button>
        <button onClick={()=>{ setPageNo(pageNo+1) }}>&gt;</button>
    </div>
    </div>
    </>
  )
}

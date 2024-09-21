import axios from 'axios'
import { BACKEND_URL } from '../backendURL'

export const LOADING = "loading"
export const ERROR = "error"
export const INITIALISE = "initialise"
export const GETPRICE = "get/price"

export const errorType = ()=>{
    return {type : ERROR}
}

export const loadingType = ()=>{
    return {type: LOADING}
}

export const initialiseType = (data)=>{
    return {type:INITIALISE, payload:data}
}

export const getPriceType = (data)=>{
    return {type: GETPRICE , payload : data}
}

export const fetchCartData = ({instance})=>async (dispatch)=>{
    try {
        dispatch(initialiseType([]))
        let cart_url = `${BACKEND_URL}/carts/data` ;
        let res = await instance.get(cart_url) ;
        console.log(res)
        console.log(res.data.data) ;
        if(res.data){
            let data2 = [...res.data.data] 
            dispatch(initialiseType(data2))
            dispatch(getPriceType(data2))
        }
        else{
            dispatch(initialiseType([]))
        }
    } catch (error) {
        console.log(error)
        dispatch(errorType())
    }
}

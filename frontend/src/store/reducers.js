import { INITIALISE, LOADING, ERROR , GETPRICE} from './actionTypes'

export const cartReducer = (state={isLoading : false , isError: false, data : []},action)=>{
    switch(action.type){
        case INITIALISE : return { isLoading : false , isError: false , data: [...action.payload]}
        case LOADING : return {...state, isLoading: true, isError : false}
        case ERROR : return {...state , isLoading : false, isError : true}
        default : return state 
    }
}

export const cartPrice = (state={price:0},action)=>{
    switch(action.type){
        case GETPRICE : 

                            let ar3 = [...action.payload] 
                            if(ar3 && ar3.length>0){
                                let sumTotal = 0
                                for(let i=0;i<ar3.length;i++){
                                    sumTotal+=Number(ar3[i].productPrice)*Number(ar3[i].quantity) 
                                }
                                return {price : sumTotal}
                            }
                            else {
                                return {price : 0}
                            }

        default : return state
    }
}
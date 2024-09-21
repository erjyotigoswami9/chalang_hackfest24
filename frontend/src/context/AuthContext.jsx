import React, { createContext, useState } from 'react'

export const AuthContext = createContext() 

function AuthProvider({children}){
    let [toggleNav1, setToggleNav1] = useState(false) 
    let [ loginCheck, setLoginCheck ] = useState(false)
    let [ access_token, setAccessToken ] = useState("")
    return(
        <AuthContext.Provider value={{ toggleNav1, setToggleNav1, loginCheck, setLoginCheck, access_token, setAccessToken }} >{children}</AuthContext.Provider>
    )
}

export { AuthProvider }
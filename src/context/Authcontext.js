import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
export const AuthContext=createContext()

export const AuthProvider =({children})=>{
    const [usertoken,setUsertoken]=useState(null)
    const [isloading,setIsloading]=useState(false)
    const login=()=>{
        setIsloading(true)
        setUsertoken("lfömew")
        AsyncStorage.setItem('userToken',usertoken)
    }
    const logout=()=>{

        setUsertoken(null)
        AsyncStorage.removeItem('userToken')
    }
    const isLoggedin=async()=>{
        try{
          let userToken=await AsyncStorage.getItem('userToken')
          setUsertoken(userToken)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        isLoggedin()
    },[])
    return(
        <AuthContext.Provider value={{login,usertoken,isloading}}>
            {children}
        </AuthContext.Provider>
    )
}
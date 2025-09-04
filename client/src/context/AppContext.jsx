/*🔹 What is Context in React?
React Context is a way to pass data deeply through the component tree without having to pass props manually at every level. It's useful for global state like user authentication, theme settings, etc.

import { createContext } from "react";
This imports the createContext function from React, which is used to create a new context object.

export const AppContext = createContext();
This creates a new context called AppContext.

It's exported so it can be used in other components (to consume or access this context).

const AppContextProvider = (props) => {
This is a functional component that will wrap other components and provide them access to the context.

    const [user, setUser] = useState(null);
useState is a React Hook that manages the user state.
Initially, user is null (meaning not logged in).
When user has a value (e.g., user info), it indicates the user is logged in.

    const value = {
        user, setUser
    }
This object holds the data (user) and function (setUser) to update it. It will be passed to all components that consume the context.

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
This renders the AppContext.Provider and passes the value to it.
props.children allows any child components wrapped inside this provider to access the AppContext.

export default AppContextProvider;
This exports the provider component so it can be used to wrap your application's root component or any subtree.

*/
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const AppContext = createContext()

const AppContextProvider =(props)=>{
    const [user, setUser] = useState(null);//if false,user is logges out and if true then user is logged in
    const [showLogin, setShowLogin] = useState(false);
    const [token,setToken] = useState(localStorage.getItem('token'))
    const[credit,setCredit] = useState(false)
    const backendUrl = "https://casecraze-backend.onrender.com"
    const navigate = useNavigate()

    const loadCreditsData = async()=>{
        try {
            //we will call the credits api and store the data in data variable
            const {data} = await axios.get(backendUrl + '/api/user/credits', {headers: {token}})
            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage = async(prompt)=>{
        try {
            //we will call the image generate api
            const{data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt},{headers: {token}})
            if(data.success){
                loadCreditsData()
                return data.resultImage //this will display the image
            }else{
                toast.error(error.message)
                loadCreditsData()
                if(data.creditBalance ===0){
                    //user will be redirected to the buy credit page
                    navigate('/buy')

                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }
    useEffect(()=>{
        if(token){
            loadCreditsData()
        }
    },[token])

    const value = {
        user, setUser,showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider

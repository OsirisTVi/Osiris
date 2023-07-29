import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { updateTokenThunk } from '../../store/thunk/Update_token.thunk'
import { useDispatch } from 'react-redux'
import axios from 'axios'



function MainPage() {



    const dispatch = useDispatch()

    const {user,loading,authTokens} = useSelector(state => state.auth)




    

    useEffect( () => {

        let sec_30 = 30000

        let interval =  setInterval(()=> {


            if(authTokens){


            
                dispatch(updateTokenThunk(localStorage.getItem('authTokens')))}
            },sec_30)

        return () => clearInterval(interval)

    
         },[authTokens])

    


  return (
    <div>
    {user ? (<h2>
        This is a main Page !!!!! and you are logged as {user.username}</h2>) : (<h2>Not User</h2>) }

    </div>
  )
}

export default MainPage
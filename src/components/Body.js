import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import Error from './Error'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import {auth} from '../utils/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import {addUser, removeUser} from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch(); 
    
    const appRouter = createBrowserRouter([
        {
            path : "/browse", 
            element : <Browse/>
        },
        {
            path : "/", 
            element : <Login/>
        },
        {
          path : "/error", 
          element : <Error/>
        }
    ]);

   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL } = user;
        dispatch(addUser({uid, email, displayName, photoURL})); 
      } else {
        dispatch(removeUser());
      }
    });
   }, []); 

  return (
    <div>
      <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default Body

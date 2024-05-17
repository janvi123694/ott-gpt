import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import {auth} from '../utils/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import {updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice'

const Login = () => {
    
    const [isSignInForm, setIsSignInForm] = useState(true); 
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const name = useRef(null); 
    const email = useRef(null); 
    const password = useRef(null); 


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleButtonClick = (e) => {
        const err = checkValidateData(email.current.value, password.current.value, isSignInForm? null : name.current.value);
        
        if(err){
            setErrorMessage(err);
            return; 
        }
        
        //sign in or sign up 
        if(isSignInForm){
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate('/browse'); 
                    setErrorMessage("")

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" +errorMessage);
                });

        }
        else{
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    setErrorMessage("")
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: "Jane Q. User", photoURL: "https://w0.peakpx.com/wallpaper/31/529/HD-wallpaper-hinata-shoyo-anime-haikyuu-hinata-volei-voleibol-thumbnail.jpg"
                        })
                        .then(() => {
                            console.log("photo updated");
                            const {uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(addUser({uid, email, displayName, photoURL})); 
                        })
                        .catch((error) => {
                            setErrorMessage(error.message)
                        });


                    navigate('/browse'); 
                })
                .catch((error) => {
                    console.log(error);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" +errorMessage);
                });
        }
        
    }
    
  return (
    <div>
        <Header/>
        <div className='absolute '>
            <img 
                src = "https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/af676bd6-ca61-4cb3-ad8a-bd817d320741/US-en-20240513-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                className="w-full filter brightness-50"
                />
        </div>


        <div 
            onClick={(e) => e.preventDefault()}
            className='w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4 text-center'> 
                {isSignInForm? "Sign In" : "Sign Up"}
             </h1>
             {
                !isSignInForm 
                && 
                <input 
                    ref = {name}
                    type="text" 
                    placeholder='Full Name'
                    className='p-4 my-4 w-full bg-gray-700'
                 />
             }
            <input 
                ref = {email}
                type="text" 
                placeholder='email'
                className='p-4 my-4 w-full bg-gray-700'
            />
            <input 
                ref = {password}
                type="password" 
                placeholder='password'
                className='p-4 my-4 w-full bg-gray-700'
            />
            <p 
                className='text-red-500'
            >
                {errorMessage}
            </p>
            <button 
                className="p-4 my-6 bg-red-700 w-full rounded-lg"
                onClick={(e) => handleButtonClick(e)}
            >
                {isSignInForm? "Sign In" : "Sign Up"}
            </button>
            <p 
                onClick={toggleSignInForm}
                className='cursor-pointer'
            > 
            {isSignInForm? "Are you new to Nextflix? Sign up now" : "Aready registered? Sign In"} 
            </p>
        </div>
    </div>
  )
}

export default Login

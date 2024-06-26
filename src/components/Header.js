import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate(); 
  const user = useSelector((store) => store.user); 
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      navigate('/error');
    });
  }
  return (
    
    <div  className = "absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      alt = "logo"
      className='w-44'
      />
       {
        user && 
        <div className='flex p-5'>
          <img className='w-12 h-12 m-1'
            alt = "userIcon" src = {user.photoURL}/>
          <button 
            className='text-bold bg-gray-200 p-1 rounded-lg cursor-pointer'
            onClick={handleSignOut}
          > 
            Sign Out
          </button>
        </div>
       }
    </div>
    
    
  )
}

export default Header

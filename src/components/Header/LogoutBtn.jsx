import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/AuthSlice.js'
import authService from '../../appwrite/Auth.js'

function LogoutBtn() {

    const Dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
        .then(() => Dispatch(logout()));
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn
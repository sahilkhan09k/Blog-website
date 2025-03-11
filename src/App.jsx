import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/Auth.js';
import { login, logout } from './store/AuthSlice.js';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);

  const Dispatch = useDispatch();

  useEffect(() => {
       authService.getCurrentUser()
       .then((userData) => {
           if(userData){
               Dispatch(login(userData));
           } else {
               Dispatch(logout());
           }
       })
       .finally(() => setLoading(false));
  },   [])
 
 return !loading ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400' >
    <div className='w-full'>

        <Header />
          <main>
            
          </main>
        <Footer />
        
    </div>
 </div>) : null;
}

export default App

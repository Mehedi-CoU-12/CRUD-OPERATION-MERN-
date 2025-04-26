import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

//page
import Home from './component/Home/Home.js';
import Login from './component/Login/Login.js';
import SignUp from './component/Signup/SignUp.js';
import Profile from './component/Profile/Profile.js';

const App = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<SignUp/>} />
            <Route path='/update/:id' element={<Profile/>} />
        </Routes>
    </>
  )
}

export default App;

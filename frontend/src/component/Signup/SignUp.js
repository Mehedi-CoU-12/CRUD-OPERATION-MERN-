import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import axios from 'axios';


function SignUp() {

    const [fullname, setfullname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            const userData={
                fullname,
                email,
                password
            };
    
            const response=await axios.post('http://localhost:4000/api/v1/user/register',userData);
            console.log(response);
            navigate('/');
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Full Name' value={fullname} onChange={(e)=>setfullname(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setemail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <button type='submit'>Register</button>
        </form>

        <p>Already have an account? <Link to='/login' >LogIn</Link> </p>
    </div>
  )
}

export default SignUp
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    const handleSubmit=(e)=>{
        e.preventDefault();
        
    }

  return (
    <div class="container">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />

            <button type="submit">Login</button>
        </form>
        <p className='' >Don't have an account? <Link to='/register' >SignUp</Link> </p>
    </div>
  )
}

export default Login
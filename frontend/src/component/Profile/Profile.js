import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './profile.css';
import axios from 'axios';


function Profile() {

    const params=useParams();
    const id=params.id;

    const [fullname, setfullname] = useState();
    const [email, setemail] = useState();
    
    useEffect(()=>{
        const fatchedUser=async () => {
            const user=await axios.get(`http://localhost:4000/api/v1/user/singleuser/${id}`);
            setfullname(user.data.fullname);
            setemail(user.data.email);
        }

        fatchedUser();

    },[])


    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            const userData={
                fullname,
                email
            };
    
            const response=await axios.put(`http://localhost:4000/api/v1/user/update/${id}`,userData);
            console.log(response);
            navigate('/');
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="container">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Full Name' value={fullname} onChange={(e)=>setfullname(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setemail(e.target.value)}/>
            <button type='submit'>Update</button>
        </form>
    </div>
  )
}

export default Profile
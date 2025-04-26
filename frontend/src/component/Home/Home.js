import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {

    const [users,setUsers]=useState([]);

    useEffect(()=>{
        const fatchedUser=async()=>{
            try {

                const user=await axios.get('http://localhost:4000/api/v1/user/alluser');
                setUsers(user?.data);
                
            } catch (error) {
                console.log('error:',error);
            }
        }

        fatchedUser();

    },[])

    const handleClick=async(id)=>{
        try {
            const response=await axios.delete(`http://localhost:4000/api/v1/user/delete/${id}`);
            console.log(response);

            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

        } catch (error) {
            console.log(error);
        }
    }   
    

  return (
    <div className="userTable">
        <Link to='/register' className='addButton' >Register</Link>

        <table border={1} cellSpacing={0} cellPadding={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            
            <tbody>
                {
                    users.map((user,index)=>{
                        return (
                            <tr key={user._id} >
                                <td>{index+1}</td>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td className='delete_update' >
                                    <button onClick={()=>handleClick(user._id)}  className='link' >Delete</button>
                                    <Link to={`/update/${user._id}`}  className='link'>Edit</Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

    </div>
  )
}

export default Home
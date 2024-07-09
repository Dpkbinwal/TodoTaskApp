import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./task.css";
import { Link, Navigate, useNavigate } from 'react-router-dom'

const User = () => {
    
    const checkCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      };

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const cookie = checkCookie('jwt'); // Replace 'yourCookieName' with the actual cookie name
        setIsAuthenticated(cookie !== null);
      },[]);
      console.log(isAuthenticated);





  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const storedUserId = localStorage.getItem('userId');

    const fetchData = async(userId)=>{
        const response = await axios.get(`http://localhost:8000/api/getall/${userId}`);
        setUsers(response.data);
    }

    fetchData(storedUserId);

  },[])

  const deleteUser = async(userId) =>{
      await axios.delete(`http://localhost:8000/api/delete/${userId}`)
      .then((respones)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
        toast.success(respones.data.msg, {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }
  const navigate=useNavigate();
  if(!isAuthenticated){
   return navigate('/login')
  }

  return (
    <div className='userTable'>
         <div style={{ display:'flex' ,alignItems: 'center',justifyContent: 'center'}}>
            <h1>List Your Task Here !</h1>
         </div>

        <div className='tabl'>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.title}</td>
                            <td>{user.desc}</td>
                            <td>{new Date(user.dueDate).toLocaleDateString()}</td>
                            <td className='actionButtons'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={`/edit/`+user._id}><i className='fa-solid fa-pen-to-square'> </i></Link>
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
        </div>

        <Link to={"/add"} className='addButton'>Add Task</Link>
   
    </div>
  )
}

export default User
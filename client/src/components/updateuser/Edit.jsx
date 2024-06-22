import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {


 const userInfo={
    title:"",
    description:"",
    date:"",
}

 const {id} = useParams();
 const navigate = useNavigate();
 const [user, setUser] = useState(userInfo);

 const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    console.log(user);
 }

 useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
        setUser(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
 },[id])


 const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
 }

  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Update Task</h3>
        <form className='addTaskForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="title">Title</label>
                <input type="text" value={user.title} onChange={inputChangeHandler} id="title" name="title" autoComplete='off' placeholder='First name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="desc">Description </label>
                <input type="text" value={user.desc} onChange={inputChangeHandler} id="desc" name="desc" autoComplete='off' placeholder='Last name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="dueDate">Due Date</label>
                <input type="date" value={user.dueDate} onChange={inputChangeHandler} id="dueDate" name="dueDate" autoComplete='off' placeholder='Email' />
            </div>
            <div className="inputGroup">
                <button type="submit">UPDATE TASK</button>
            </div>
        </form>
    </div>
  )
}

export default Edit
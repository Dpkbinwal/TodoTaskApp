import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const userInfo={
      title:"",
      description:"",
      date:"",
  }

  const [user, setUser] = useState(userInfo);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      console.log(e.target);
      const {name, value} = e.target;
      setUser({...user, [name]:value});
      console.log(value);
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    console.log(e);

    await axios.post("http://localhost:8000/api/create", user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"bottom-right",marginTop:"100"})
       console.log('Data sent successfully:', response.data);
       navigate("/")
    })
    .catch(error => console.log(error))
  }


  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Add Task</h3>
        <form className='addTaskForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="title">Title</label>
                <input type="text" onChange={inputHandler} id="title" name="title" autoComplete='off' placeholder='Title' />
            </div>
            <div className="inputGroup">
                <label htmlFor="desc">Description</label>
                <input type="text" onChange={inputHandler} id="desc" name="desc" autoComplete='off' placeholder='Description' />
            </div>
            <div className="inputGroup">
                <label htmlFor="dueDate">Due Date</label>
                <input type="date" onChange={inputHandler} id="dueDate" name="dueDate" autoComplete='off' placeholder='' />
            </div>
            <div className="inputGroup">
                <button type="submit">ADD TASK</button>
            </div>
        </form>
    </div>
  )
}

export default Add
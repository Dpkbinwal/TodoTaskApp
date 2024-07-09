import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {useForm , watch} from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      
      const onSubmit = async(data) => {
        console.log(data)

        try{
            const response = await axios.post("http://localhost:8000/auth/login",{
                ...data,
            },{withCredentials:true});
            console.log(response.data);
            
            if(response.data.isVerified){
                localStorage.setItem('userId', response.data.id);
                toast.success(response.data.msg);
                navigate('/');
                // <Navigate to="/"/>
            }
            else{
                toast.error(response.data.msg);
            }
                
        }catch(err){
            console.log(err);
            toast.error(err.response.data.msg);
        }

      }



  return (
    <div className="register_main">
    <div className="container">
        <h2>Login Account</h2>
        <form   onSubmit={handleSubmit(onSubmit) }>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" {...register("email", { required: true })} placeholder="Enter your password"/>
                {errors.email && <span style={{color:"red"}}>This field is required</span>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" {...register("password", { required: true })} placeholder="Enter your password"/>
                {errors.password && <span style={{color:"red"}}>This field is required</span>}
            </div>
            
              <button type="submit">Submit</button>
            <span>
                Don't have Account ? New User <Link to='/register'>Register</Link>
            </span>
        </form>
    </div>

    </div>
  )
}

export default Login
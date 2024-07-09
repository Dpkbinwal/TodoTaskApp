import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm , watch} from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'


const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      
      const onSubmit = async(data) => {
        //console.log(data)
        const userInfo ={
            name : data.name,
            email : data.email,
            password : data.password,
          }

        try{
            const response = await axios.post("http://localhost:8000/auth/register",userInfo,{withCredentials:true});
            console.log(response.data);
            
            if(response.data.created){
                toast.success(response.data.msg)
                navigate('/login')
            }
            else toast.error(response.data.msg);
        }catch(err){
            console.log(err);
        }

      }



  return (
    <div className="register_main">
    <div className="container">
        <h2>Register Account</h2>
        <form   onSubmit={handleSubmit(onSubmit) }>

            <div>
                <label htmlFor="name">UserName</label>
                <input type="name" name="name" {...register("name", { required: true })} placeholder="Username"/>
                {errors.name && <span style={{color:"red"}}>This field is required</span>}
            </div>
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
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" {...register("confirmPassword", { required: true , 
                     validate: (val) => {
                        if (watch('password') != val) {
                          return "Your passwords do no match";
                        }
                      },
                })} placeholder="Enter your email"/>
                {errors.confirmPassword && <span style={{color:"red"}}>Password does not match</span>}
            </div>
            {/* {errors.exampleRequired && <span>This field is required</span>} */}
            <button type="submit">Submit</button>
            <span>
                Already have an account ? <Link to='/login'>Login</Link>
            </span>
        </form>
    </div>

    </div>
  )
}

export default Register
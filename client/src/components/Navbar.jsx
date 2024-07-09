import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'

const Navbar = () => {

  const navigate = useNavigate();

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    
  };

  // const [cookies,setCookie,removeCookie] = useCookies([]);
  // useEffect(()=>{
  //   const verifyUser = async()=>{
  //     if(!cookies.jwt){
  //       navigate("/login")
  //     }else{
  //      const {data} = await axios.post("http://localhost:8000",{},{withCredentials:true});
  //      if(!data.status){
  //       removeCookie("jwt");
  //       navigate("/login");
  //      }
  //      else toast.success(`Hii ${data.user},{theme: "dark"}`);
  //     }
  //   }
  //   verifyUser()
  // },[cookies,navigate,removeCookie])



  const logout=()=>{
    deleteCookie('jwt');
    //  removeCookie('jwt');
    navigate('/login')
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to='/'>
        <img src="https://i.graphicmama.com/uploads/2019/3/5c81d12ca5c93-Tasks%20Management%20Logo%20Design.jpg" alt='LOGO' className='logo'/>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link target='_blank' to="https://dpkbinwalportfolio.netlify.app/">PortFolio</Link></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

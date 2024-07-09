import './App.css';
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import Task from './components/getuser/Task';
import Add from './components/addTask/Add';
import Edit from './components/updateTask/Edit';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Secret from './components/auth/Secret';
import {useEffect, useState} from 'react'


const checkCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const Layout = ({ children }) => {
  
  const location = useLocation();
  return (
    <>
      {(location.pathname !== '/login' && location.pathname !=='/register' && <Navbar />)}
      {children}
    </>
  );
};


const App=()=>{
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
// useEffect(() => {
//     const cookie = checkCookie('jwt'); // Replace 'yourCookieName' with the actual cookie name
//     setIsAuthenticated(cookie !== null);
//   });
//   console.log(isAuthenticated);
  return (
    <>
    
    <BrowserRouter>
     {/* {location.pathname !== '/login' && <Navbar />} */}
     <Layout>

      <Routes> 
        <Route path="/" element={<Task/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route active="true" path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<Secret/>}/>
      </Routes>
      </Layout>
    </BrowserRouter>
    </>
  )
}


export default App;

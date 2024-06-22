import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Task from './components/getuser/Task';
import Add from './components/adduser/Add';
import Edit from './components/updateuser/Edit';
import Navbar from './components/Navbar';

const App=()=>{
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Task/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}


export default App;

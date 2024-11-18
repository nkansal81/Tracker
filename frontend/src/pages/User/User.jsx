import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useLocation,useNavigate } from 'react-router-dom'
import { UserTable } from './UserTable';
import "../Components/Table.css"
// import "../../App.css";

const User = () => {
  const [tasks,setTasks] = useState([]);
  const location = useLocation();
  let navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const {title,desc,price,project_key,sprint,logged} = { ...location.state };
  const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;

  useEffect(()=>{ 
     const fetchAllTasks = async ()=>{
       try{
        const res = await axios.get("http://localhost:8800/task/"+id);
        setTasks(res.data);
        }catch(err){
          console.log(err);
       }
     }
     fetchAllTasks();
     console.log("taskLogged",price);
  },[])

  const handleEditRow = (idx) => {
     console.log("idx",idx)
  }

  const handleHomePage = () => {
    window.location = '/';  
    // if(reloadCount < 2) {
    //   // setTimeout(function(){
    //     sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //     window.location.reload();
    // //  }, 5000);
    // } else {
    //   sessionStorage.removeItem('reloadCount');
    // }
  }
  
  return (
    <div className='App'>
        <h1 className='heading'>Tasks</h1>
        <UserTable rows={tasks} bookId={id} price={price}/>
       
        <div className='buttonFooter'>
          <button className='btn'><Link to={{pathname: `/addTask/${id}`}}>Add New Task</Link></button>
          <button className='btn' onClick={() => navigate(-1)}>Go Back</button>
          {/* <button className='formButton' onClick={handleHomePage}>Home Page</button> */}

          <button className='btn'><Link to="/">Home Page</Link></button>
        </div>

    </div>
  )
}

export default User
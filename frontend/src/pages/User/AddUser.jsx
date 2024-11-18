import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'


const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [task,setTask] = useState({
    "task":"",
    "estimate":"",
    "bookId": id,
  })
  const handleChange = (e) => {
     setTask((prev) => ({...prev,[e.target.name]: [e.target.value]}))
  }
  const handleClick = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8800/task", task);
      navigate(`/task/${id}`);
    }catch(err){
       console.log(err);
    }
    console.log(task)
  }
  return (
    <div className='App'>
        <h1 className='heading'>Add New Task</h1>
        <div className='form'>
          <input type="text" placeholder='Task' onChange={handleChange} name="task"></input>
          <input type="number" placeholder='Estimate' onChange={handleChange}  name="estimate"></input>
        </div>
        <div className='buttonFooter'>
          <button className='formButton' onClick={handleClick}>Add</button>
          <button className='formButton' onClick={() => navigate(-1)}>Go Back</button>
        </div>
    </div>
  )
}

export default Add
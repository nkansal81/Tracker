import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[3];
  const taskId = location.pathname.split("taskId/")[1];
  const {name,estimate} = location.state;

  const [task,setTask] = useState({
    "task":name,
    "estimate":estimate,
  })
  const handleChange = (e) => {
     setTask((prev) => ({...prev,[e.target.name]: [e.target.value]}))
     console.log(task);
  }
  const handleClick = async (e) => {
    e.preventDefault();
    try{
      await axios.put("http://localhost:8800/updateTask/bookId/"+bookId+"/taskId/"+taskId, task);
      navigate(`/task/${bookId}`);
    }catch(err){
       console.log(err);
    }
  }

  useEffect(() => {
    try{
        let result = axios.get("http://localhost:8800/taskId/"+taskId);
        console.log("result",result);
      } catch(err){
         console.log(err);
      }
  },[])

  return (
    <div className='App'>
        <h1 className='heading'>Update the Task</h1>
        <div className='form'>
          <input type="text" placeholder='Task' onChange={handleChange} name="task" value={task.task}></input>
          <input type="text" placeholder='Estimate' onChange={handleChange} name="estimate" value={task.estimate}></input>
        </div>
        <div className='buttonFooter'>
          <button className='formButton' onClick={handleClick}>Update</button>
          <button className='formButton' onClick={() => navigate(-1)}>Go Back</button>
        </div>
 

    </div>
  )
}

export default UpdateTask
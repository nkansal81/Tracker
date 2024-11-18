import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom';
// import "./Components/Table.css"
import "../App.css";

const Add = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const {title,desc,price,project_key,sprint,logged,rem} = location.state

  const [book,setBook] = useState({
    "title":"",
    "desc":"",
    "project_key": "",
    "price":"",
    "sprint": "",
    "logged": "",
    "rem": ""
  })
  const handleChange = (e) => {
     setBook((prev) => ({...prev,[e.target.name]: [e.target.value]}))
     console.log(book);
  }
  const handleClick = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8800/book", book);
      navigate("/");
    }catch(err){
       console.log(err);
    }
  }
  return (
    <div className='App'>
        <h1 className='heading'>Add New User</h1>
        <div className='form'>
          <input className='row' type="text" placeholder='Name' onChange={handleChange} name="title"></input>
          <input type="text" placeholder='Project Name' onChange={handleChange} name="desc"></input>
          <input type="number" placeholder='Key'onChange={handleChange}  name="key"></input>

          <input type="number" placeholder='Estimate'onChange={handleChange}  name="price"></input>
          <input type="text" placeholder='sprint' onChange={handleChange} name="sprint"></input>
          <input type="number" placeholder='Hours logged'onChange={handleChange}  name="logged"></input>
          <input type="number" placeholder='Remaining'onChange={handleChange}  name="rem"></input>
        </div>
        <div className='buttonFooter'>
          <button className='formButton' onClick={handleClick}>Add</button>
          <button className='formButton' onClick={() => navigate("/")}>Home Page</button>
        </div>
    </div>
  )
}

export default Add
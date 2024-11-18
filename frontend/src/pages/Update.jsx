import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Components/Table.css';

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const {title,desc,price,project_key,sprint,logged,rem} = location.state
  console.log("props",title,desc,price);

  // const[data,setData] = useState("niti")
  const [book,setBook] = useState({
    "title":title,
    "desc":desc,
    "project_key": project_key,
    "price":price,
    "sprint": sprint,
    "logged": logged,
    "rem": rem
  })
  const handleChange = (e) => {
    e.preventDefault();
    setBook((prev) => ({...prev,[e.target.name]: [e.target.value]}));
  }
  useEffect(() => {
    const remain = book.price - book.logged;
    setBook((prev) => ({...prev,"rem": remain}))
  },[book.price])

  const handleClick = async (e) => {
    e.preventDefault();
    try{
      await axios.put("http://localhost:8800/book/"+bookId, book);
      navigate("/");
    }catch(err){
       console.log(err);
    }
  }
  const handleHome = () => {
    navigate("/");
  }
  return (
    <div className='App'>
        {/* <div className='formControl'> */}
          <h1 className='heading'>Update the User</h1>

          <div className='form'>
            <div className='row'>
                <label>Enter your name:</label>
                <input type="text" placeholder='Name' className='input' onChange={handleChange} name="title" value={book.title}></input>
            </div>
            <div className='row'>
              <label>Enter Description:</label>
              <input type="text" placeholder='Description' onChange={handleChange} name="desc" value={book.desc}></input>
            </div>

            <div className='row'>
              <label>Enter Key: </label>
              <input type="text" placeholder='Key' onChange={handleChange} name="project_key" value={book.project_key}></input>
            </div>

            <div className='row'>
              <label>Enter Estimate:</label>
              <input type="number" placeholder='Estimate'onChange={handleChange}  name="price" value={book.price}></input>
            </div>

            <div className='row'>
              <label>Enter Sprint:</label>
              <input type="text" placeholder='sprint' onChange={handleChange} name="sprint" value={book.sprint}></input>
            </div>

            {/* <div className='row'>
              <label>Enter Logged Hours:</label>
              <input type="number" placeholder='hours logged'onChange={handleChange}  name="logged" value={book.logged}></input>
            </div> */}

            {/* <div className='row'>
              <label>Enter Remaining Estimate: </label>
              <input type="number" placeholder='remaining'onChange={handleChange}  name="rem" value={book.rem}></input>
            </div> */}
          </div>

          <div className='buttonFooter'>
            <button className='formButton' onClick={handleClick}>Update</button>
            <button className='formButton' onClick={handleHome}>Home page</button>
          </div>
        {/* </div> */}
    </div>
  )
}

export default Update
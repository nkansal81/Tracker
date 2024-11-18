import React,{createContext} from 'react'
import { useEffect } from 'react';
import { useState,useContext } from 'react'
import axios from 'axios';
import Table from './Components/Table';
import { Modal } from './Components/Modal';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import Update from './Update';
import "../App.css"

const Books = () => {
  const [rows,setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [remain,setRem] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
     const fetchAllBooks = async ()=>{
       try{
        const res = await axios.get("http://localhost:8800/book");
        setRows(res.data);
        console.log("res",res);
       }catch(err){
          console.log(err);
       }
     }
     fetchAllBooks();
  },[])
  
  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  const handleDelete = async (id) => {
    try{
        await axios.delete("http://localhost:8800/book/"+id)
        window.location.reload();
    }catch(err){
        console.log(err)
    }
  }
  return (
    <div className='App'>
        <h1 className='heading'>Tracker</h1>
        <Table rows={rows} editRow={handleEditRow}></Table>
        {/* {modalOpen && ( 
        // <Modal
        //   closeModal={() => {
        //     setModalOpen(false);
        //     setRowToEdit(null);
        //   }}
        //   onSubmit={handleSubmit}
        //   defaultValue={rowToEdit !== null && rows[rowToEdit]}
        // />
      // )}
   
       */}
       <div className='buttonFooter'>
        <button className='btn'><Link to="/add">Add New User</Link></button>
       </div>
    </div>
  )
}

export default Books;
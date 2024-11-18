import React, { createContext, useContext } from "react";
import axios from 'axios';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import "./../Components/Table.css"
import { useEffect,useState } from "react";
import LoggedContext from "../LoggedContext";
import "../Components/Table.css";

export const UserTable = ({ rows, bookId,price }) => {
  const [logged,setLogged] = useState(0);
  
  useEffect(()=> {
     try{
      const data =  rows.map((row) => {
        console.log("row",rows);
        return row.estimate;
      })
      let sum = data.reduce((a, b) => a + b, 0)
      setLogged(sum)
      axios.put("http://localhost:8800/booklogged/"+bookId, {"logged" : sum});

     }catch(err){
       console.log(err);
     }
  },[rows])

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Estimate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            // const statusText =
            //   row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>{row.task}</td>
                <td className="expand">{row.estimate}</td>
                <td className="fit">
                  <span className="actions">
                    <Link to={`/updateTask/bookId/${bookId}/taskId/${row.id}`} 
                      state={{name: row.task,estimate: row.estimate}}
                      >
                      <BsFillPencilFill
                        className="edit-btn formUpdate"
                        target="_blank" rel="noopener noreferrer"
                        // onClick={() => editRow(idx)}
                      />
                    </Link>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

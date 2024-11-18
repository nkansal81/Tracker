import React,{ createContext } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import User from "../User/User";
import { useEffect,useState,useContext } from "react";
import LoggedContext from "../LoggedContext";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import "./Table.css";

const Table = ({ rows }) => {
  const [on,setOn] = useState(false);
  // const {logged,handleStateChange} = useContext(LoggedContext);
  const [estimate,setEstimate] = useState(0);
  const location = useLocation();

  const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;

  useEffect(()=> {
    try{
     rows.map((row) => {
       return new Promise((resolve) => {
         setEstimate(row.price);
         const output = (row.price-row.logged)
        //  console.log("row",row.price)
          axios.put("http://localhost:8800/bookRem/"+row.id, { "rem" : output});
          resolve()
       })
     })
    }catch(err){
      console.log(err);
    }
  },[rows])
  
  useEffect(() => {
    if(reloadCount < 1) {
      setTimeout(function(){
        sessionStorage.setItem('reloadCount', String(reloadCount + 1));
        window.location.reload();
     }, 500);
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, []);

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="expand">Project Name</th>
            <th>Key</th>
            <th>Estimate</th>
            <th>Sprint</th>
            <th>Logged</th>
            <th>Remaining</th>
            <th className="expand">Actions</th>
          </tr>
        </thead>
         <tbody>
          {rows && rows.map((row, idx) => {
            return (
              <><tr key={idx}>
                <td>{row.title}</td>
                <td className="expand">{row.desc}</td>
                <td>{row.project_key}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {row.price}
                  </span>
                </td>
                <td>{row.sprint}</td>
                <td>{row.logged}</td>
                <td>{row.rem}</td>

                <td className="fit">
                  <span className="actions">
                    <Link className="formButton edit-btn" to={{ pathname: `/update/${row.id}` }}
                      state={{
                        title: row.title, desc: row.desc, project_key: row.project_key,
                        price: row.price, sprint: row.sprint, logged: row.logged, rem: row.rem
                      }}
                    >
                      Edit
                      {/* <BsFillPencilFill
                        className="formButton"
                        target="_blank" rel="noopener noreferrer" /> */}
                    </Link>
                    {/* <button className="formButton">  */}
                    <Link className="formButton edit-btn" to={`/task/${row.id}`}
                        state= {{ title: row.title, desc: row.desc,project_key: row.project_key,
                          price: row.price,sprint: row.sprint}}
                      >
                        Tasks
                    </Link>
                    {/* </button> */}
                    {/* <Accordion>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>Tasks</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                          <User target='_blank'>
                          </User>
                      </AccordionDetails>
                    </Accordion> */}
                    {/*
                        <div>
                          <button onClick={handleOpen}>Task</button>
                        </div>
                        {open && <User target='_blank'>Task</User>} */}
                  </span>
                </td>
              </tr>
              <tr>

              </tr>
              </>
            );
          })}
        </tbody> 
      </table>
    </div>
  );
};

export default Table;
// export const useAuth = () => {
//   return useContext(LoggedContext);
// };

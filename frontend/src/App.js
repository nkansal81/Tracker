import logo from './logo.svg';
import './App.css';
import React,{createContext,useState} from 'react'
import
     { BrowserRouter,
      Routes,
      Route,
      } 
  from "react-router-dom";
import Books from './pages/Books';
// import { Books } from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import User from './pages/User/User';
import AddUser from './pages/User/AddUser';
import UpdateTask from './pages/User/UpdateTask';
import LoggedContext from './pages/LoggedContext';
import "./App.css";

function App() {
  const name = "nitika"
   const [logged,setLogged] = useState({
    "logged" : 0
  })
  const handleStateChange = (value) => {
    setLogged({"logged" : value});
  };
  return (
    <LoggedContext.Provider  className="App" value={{logged:logged,handleStateChange:handleStateChange}}>
      <div>
        <BrowserRouter>
          <Routes>
              <Route path="/" forceRefresh={true} element={<Books/>}/>
              <Route path="/add" element={<Add/>}/>
              <Route path="/update/:id" element={<Update/>}/>
              <Route path="/task/:id" element={<User/>}/>
              <Route path="/addTask/:id" element={<AddUser/>}/>
              <Route path="/updateTask/bookId/:bookId/taskId/:id" element={<UpdateTask/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </LoggedContext.Provider>
  );
}

export default App;
// export {LoggedContext}

import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import OperatorInfo from './pages/OperatorInfo';
import OperatorList from './pages/OperatorList';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from "./partials/Header";

import 'bootstrap/dist/css/bootstrap.css';
import './styles.css'

class App extends React.Component{  

  render() {
    return <div className="App">
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/operators" element={<OperatorList/>}/>
            <Route path="/operator/:id" element={<OperatorInfo/>}/>
            <Route path="/login" element={<Login/>}/> 
            <Route path="/register" element={<Register/>}/> 
          </Routes>
      </BrowserRouter>
    </div>
  }
}

export default App


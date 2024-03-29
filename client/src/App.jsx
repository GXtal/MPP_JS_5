import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import OperatorInfo from './pages/OperatorInfo';
import OperatorList from './pages/OperatorList';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from "./partials/Header";
import PrivateContextLayout from "./components/PrivateContextLayout";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

import 'bootstrap/dist/css/bootstrap.css';
import './styles.css'

function App() {

  const { loginFail } = useContext(AuthContext)


  return <div className="App">

    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateContextLayout loginFail={loginFail} />}>
        <Route path="/operators" element={<OperatorList />} />
        <Route path="/operator/:id" element={<OperatorInfo />} />

      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>

  </div>
}

/* 
            
            
*/
export default App


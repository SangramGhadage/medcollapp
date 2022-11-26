import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Fragment } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './component/sideBar/main'
import Login from './component/adminLogin/index'

function App() {
  const user = localStorage.getItem("user")

  return (
    <div>
      <div>
        <Router>
          <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/SideBar' element={<SideBar/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

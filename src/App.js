import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Fragment } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './component/sideBar/main'
import Login from './component/adminLogin/index'
import Country from './component/countries/index'

function App() {
  const user = window.localStorage.getItem("user")

  return (
    <div>
      <div>
        <Router>
          <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/SideBar' element={<SideBar/>} />
          <Route exact path='/Country' element={<Country/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

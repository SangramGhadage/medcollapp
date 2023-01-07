import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Fragment } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SideBar from './component/sideBar/main'
import Login from './component/adminLogin/index'
import Dashboard from './component/dashboard';
import Country from './component/countries/index'
import States from './component/states/index';
import Disease from './component/disease';
import Hospital from './component/hospitals';

function App() {
  const user = window.localStorage.getItem("user")

  return (
    <div>
      <div>
        <Router>
          <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/Dashboard' element={<Dashboard/>} />
          {/* <Route exact path='/SideBar' element={<SideBar/>} /> */}
          <Route exact path='/Country' element={<Country/>} />
          <Route exact path='/States' element={<States/>} />
          <Route exact path='/Disease' element={<Disease/>} />
          <Route exact path='/Hospital' element={<Hospital/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

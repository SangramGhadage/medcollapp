import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Fragment } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './component/sideBar/sideBar'

function App() {
  return (
    <div>
      <div>
        <Router>
          <Routes>
          <Route exact path='/' element={<SideBar/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

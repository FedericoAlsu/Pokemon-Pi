import './App.css';
import Nav from "./components/Nav";
import Home from "./components/Home";
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';


//const Landing = import "./components/Landing"
function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className='App'>
      {pathname !== '/' && <Nav />}
      <Routes>
        <Route path='/' element={<Home/>} />
      
    
      </Routes>
    </div>
  );
}

export default App;

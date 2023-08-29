// src/App.js
import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import Navbar from "./Components/Navbar"
import Card from "./Components/Card"; 
import Category from "./Components/Category"; 
import Signup from "./Components/Signup"; 
import Signin from "./Components/Signin"; 
import Myorder from "./Components/Myorder"; 
import Mycart from "./Components/Cart.js"; 
import Alert from '@mui/material/Alert';
import Checkout from './Components/Checkout'; 
import LoadingBar from 'react-top-loading-bar'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState} from 'react'; 
function App() {
  const [type,settype] = useState('') 
  const[message,setmessage] = useState('')
  const [progress, setProgress] = useState(0)
  return (
    <>
    <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Alert severity={type}>{message}</Alert>


        <Routes>
        <Route  path='/'  element={<Card element="this"  progress={setProgress}/>}  />
        <Route  path='/SciFi'  element={<Category element="SciFi" key="SciFi"  progress={setProgress} />}  />
        <Route  path='/Comedy'  element={<Category element="Comedy" key="comedy"  progress={setProgress} />}  />
        <Route  path='/Fiction'  element={<Category element="Fiction" key="Fiction"  progress={setProgress} />}  />
        <Route  path='/signup'  element={<Signup/>} key="Signup"  />
        <Route  path='/login'  element={<Signin SetType={settype} Setmessage={setmessage} />} key="Login" />
        <Route  path='/Myorder'  element={<Myorder SetType={settype} Setmessage={setmessage} />} key="myorder" />
        <Route  path='/MyCart'  element={<Mycart  SetType={settype} Setmessage={setmessage} />}  key="cart"/>
        <Route  path='/checkout'  element={<Checkout/>}  key="checkout"/>






        </Routes>
    </Router>
    </>
  );
}

export default App;
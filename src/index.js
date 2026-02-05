import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAuthentication from './components/AdminAuthentication';
import Credentials from './components/Credentials'
import Loader from './components/Loader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <ToastContainer />
      <Routes>
          <Route path='/' element = {<App />} /> 
          <Route path='/authen' element = {<AdminAuthentication />} />
          <Route path='/adminkey' element = {<Credentials />} />
          <Route path='/dash' element = {<Loader />} />
      </Routes>
  </Router>
); 

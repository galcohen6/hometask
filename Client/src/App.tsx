import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Sucsses from './components/Sucsses';
import LoginForm from './components/LoginForm'; 
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
        <Route path="/home" element={<Sucsses />} />
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
    </Router>
    </div>

  );
}

export default App;

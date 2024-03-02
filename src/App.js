import * as React from 'react';
import './App.css';

import Members from './Components/Members';
import Login from './Components/Login/Login';
import TaxCal from './Components/TaxCalculator/TaxCal';
import Dashboard from './Components/Dashboard/Dashboard';
import Payments from './Components/Payments/Payments';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Members" element={<Members />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/TaxCal" element={<TaxCal />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Payments" element={<Payments/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

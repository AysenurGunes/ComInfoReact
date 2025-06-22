import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Company from './components/company/Company';
import Employee from './components/employee/Employee';
import Header from './components/header/Header';

const App = () => {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/companies" element={<Company />} />
          <Route path="/employees" element={<Employee/>} />
      </Routes>
    </Router>
  );
};

export default App;

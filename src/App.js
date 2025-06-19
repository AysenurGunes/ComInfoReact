import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Company from './components/company/Company';


const App = () => {
  
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Ana Sayfa</Link></li>
            <li><Link to="/companies">Şirketler</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/companies" element={<Company />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

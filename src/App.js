import React from 'react';
// import logo from './logo.svg';
import Navbar from './app/redux/components/navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
        <div className="App">
          <Navbar />
        </div>
    </Router>
  );
}

export default App;

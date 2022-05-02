import React from 'react';
// import logo from './logo.svg';
import Navbar from './app/redux/components/navbar/Navbar';
import { ProjectList } from './app/redux/components/projectList/ProjectList';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
        <div className="App">
          <Navbar />
        </div>
        <div>
          <ProjectList />
        </div>
    </Router>
  );
}

export default App;

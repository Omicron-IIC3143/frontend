import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRoutes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

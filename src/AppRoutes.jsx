import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RegisterUserPage from './views/RegisterUserPage';
import LandingPage from './views/landingPage/LandingPage';
import ShowProject from './views/project/projectShow/ProjectShow';
import RegisterProject from './views/project/registerProject/RegisterProject';
import Login from './views/user/login/Login';
import AuthContextProvider from './contexts/AuthContext';
import ShowUser from './views/user/userShow/ShowUser';

const AppRouter = function AppRouter() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects/:id" element={<ShowProject />} />
        <Route path="projectregister" element={<RegisterProject />} />
        <Route path="/profile" element={<ShowUser />} />
        <Route path="/register" element={<RegisterUserPage />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default AppRouter;

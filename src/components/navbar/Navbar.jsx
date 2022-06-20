import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import image from './user_image.jpeg';
import useAuth from '../../hooks/useAuth';

function Navbar() {
  const { currentUser, handleUserLogout } = useAuth();

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" />}>
          <img src={currentUser.pictureUrl ? (currentUser.pictureUrl) : (image)} alt="user profile" width="20" height="20" />
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Página principal</CDBSidebarMenuItem>
            </NavLink>
            {currentUser ? (
              <>
                <NavLink
                  exact
                  to={`/users/${currentUser.id}/projects`}
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="list-alt">Mis proyectos</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/tables" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="hand-holding-usd">Proyectos financiados</CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  to={`/users/${currentUser.id}/financialinfo`}
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="chart-line">Información financiera</CDBSidebarMenuItem>
                </NavLink>

              </>
            // eslint-disable-next-line react/jsx-no-useless-fragment
            ) : (<></>)}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
            {currentUser ? (
              <>
                <NavLink exact to="/user/update" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user-circle">Mi perfil</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/" activeClassName="activeClicked" onClick={() => { handleUserLogout(); }}>
                  <CDBSidebarMenuItem icon="sign-out-alt">Cerrar sesión</CDBSidebarMenuItem>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink exact to="/login" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="sign-in-alt">Iniciar sesión</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/register" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="file-signature">Registrarse</CDBSidebarMenuItem>
                </NavLink>
              </>
            )}
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default Navbar;

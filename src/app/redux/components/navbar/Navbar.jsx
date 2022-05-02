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

const Navbar = () => {
    return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <img src="user_image.jpeg" alt="user profile" width="20" height="20"></img>
            

          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list-alt">Tus proyectos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="hand-holding-usd">Tus proyectos financiados</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Información financiera</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="arrows-alt">Tipos de proyectos</CDBSidebarMenuItem>
            </NavLink>

          
          </CDBSidebarMenu>
        </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: '20px 5px',
              }}
            >
                <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem>Configuración</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem>Cerrar sesión</CDBSidebarMenuItem>
                </NavLink>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  };
  
  export default Navbar;
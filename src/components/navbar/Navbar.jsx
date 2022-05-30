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

const Navbar = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <img src={image} alt="user profile" width="20" height="20"></img>
            

          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list-alt">Mis proyectos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="hand-holding-usd">Proyectos financiados</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Mi información financiera</CDBSidebarMenuItem>
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
                {!currentUser? (
                  <NavLink exact to="/register" target="_blank" activeClassName="activeClicked">
                  <CDBSidebarMenuItem>Registrate</CDBSidebarMenuItem>
                  </NavLink>
                ) : (
                  <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem>Cerrar sesión</CDBSidebarMenuItem>
                </NavLink>
                )}
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  };
  
  export default Navbar;
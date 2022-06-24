import React from 'react';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/navbar/Navbar';
import ButtonBack from '../../components/buttons/buttonBack/ButtonBack';
import TermsConditions from '../../components/termsConditions/TermsConditions';
import './TermsAndConditions.css';

function TermsAndConditions() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="grid-container">
        <div>
          <Navbar />
        </div>
        <div className="page-wrapper">
          <div className="width-80 center-content-x">
            <h1 className="title-terms">
              Política de términos y condiciones
            </h1>

          </div>
          <div className="width-80 center-content-x">
            <TermsConditions />
          </div>
          {!currentUser.isAdmin ? (
            <div className="width-80 center-content-x">
              <div className="margin-buttons">
                <Button className="button-contact-admin" icon="smile-beam" variant="primary" href="mailto:vicho@uc.cl,anto@uc.cl,deleted@uc.cl?subject=Social%20Starter%20-%20Contacto%20con%20Administrador">
                  <h4>
                    Contactar Equipo Social Starter
                  </h4>
                </Button>
                <ButtonBack />
              </div>
            </div>
          ) : (
            <div className="margin-buttons">
              <ButtonBack />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="grid-container  ">
      <div>
        <Navbar />
      </div>
      <div className="page-wrapper">
        <div className="width-80 center-content-x">
          <h1 className="title-terms">
            Política de términos y condiciones
          </h1>
        </div>
        <div className="width-80 center-content-x">
          <TermsConditions />
        </div>
        <div className="width-80 center-content-x">
          <div className="margin-buttons">
            <Button className="button-contact-admin" icon="smile-beam" variant="primary" href="mailto:vicho@uc.cl,anto@uc.cl,deleted@uc.cl?subject=Social%20Starter%20-%20Contacto%20con%20Administrador">
              <h4>
                Contactar Equipo Social Starter
              </h4>
            </Button>
            <ButtonBack />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonPostulatedProjectsUser from '../buttons/postulatedProjects/PostulatedProjects';

test('Renders Postulated Projects title', () => {
  const { getByText } = render(
    <Router>
      <ButtonPostulatedProjectsUser />
    </Router>,
  );
  getByText('Proyectos postulados');
});
test('OnClick Correct', () => {
  render(
    <Router>
      <ButtonPostulatedProjectsUser />
    </Router>,
  );
  fireEvent.click(screen.getByText(/Proyectos postulados/i));
});

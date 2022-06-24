import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonPostulatedProjectsUser from '../buttons/postulatedProjects/PostulatedProjects';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <ButtonPostulatedProjectsUser />
    </Router>,
  );
  getByText('Proyectos postulados');
});

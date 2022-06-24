import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonFinancedProjectsUser from '../buttons/financedProjects/FinancedProjects';

test('Renders Financed Projects title', () => {
  const { getByText } = render(
    <Router>
      <ButtonFinancedProjectsUser />
    </Router>,
  );
  getByText('Proyectos financiados');
});
test('OnClick Correct', () => {
  render(
    <Router>
      <ButtonFinancedProjectsUser />
    </Router>,
  );
  fireEvent.click(screen.getByText(/Proyectos financiados/i));
});

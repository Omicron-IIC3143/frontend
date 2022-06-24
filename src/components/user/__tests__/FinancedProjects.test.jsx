import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonFinancedProjectsUser from '../buttons/financedProjects/FinancedProjects';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <ButtonFinancedProjectsUser />
    </Router>,
  );
  getByText('Proyectos financiados');
});

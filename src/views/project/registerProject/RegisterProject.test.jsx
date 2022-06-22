import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterProject from './RegisterProject';

test('Renders login title', () => {
  const { getByText, getByLabelText } = render(
    <Router>
      <RegisterProject />
    </Router>,
  );
  getByText('Postulación de nuevo proyecto');
});

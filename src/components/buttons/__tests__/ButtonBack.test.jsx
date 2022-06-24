import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonBack from '../buttonBack/ButtonBack';

test('Renders login title', () => {
  // Test commit
  const { getByText } = render(
    <Router>
      <ButtonBack />
    </Router>,
  );
  getByText('Volver atrás');
});

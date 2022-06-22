import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonContacting from '../buttons/buttonContacting/ButtonContacting';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <ButtonContacting />
    </Router>,
  );
  getByText('Contactar Proyecto');
});

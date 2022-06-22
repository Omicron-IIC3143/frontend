import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonFinancing from '../buttons/buttonFinancing/ButtonFinancing';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <ButtonFinancing />
    </Router>,
  );
  getByText('Financiar Proyecto');
});

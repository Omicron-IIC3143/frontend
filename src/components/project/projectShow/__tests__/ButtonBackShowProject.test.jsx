import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonBackShowProject from '../buttons/buttonBack/ButtonBackShowProject';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <ButtonBackShowProject />
    </Router>,
  );
  getByText('Volver atrás');
});

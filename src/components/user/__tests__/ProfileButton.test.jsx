import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonGoProfile from '../buttons/profileButton/ProfileButton';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <ButtonGoProfile />
    </Router>,
  );
  getByText('Ver perfil');
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonGoProfile from '../buttons/profileButton/ProfileButton';

test('Renders Profile Button title', () => {
  const { getByText } = render(
    <Router>
      <ButtonGoProfile />
    </Router>,
  );
  getByText('Ver perfil');
});
test('OnClick Correct', () => {
  render(
    <Router>
      <ButtonGoProfile />
    </Router>,
  );
  fireEvent.click(screen.getByText(/Ver perfil/i));
});

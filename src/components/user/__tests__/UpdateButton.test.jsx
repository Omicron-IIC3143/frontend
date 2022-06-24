import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonUpdatingUser from '../buttons/updateButton/UpdateButton';

test('Renders Update Button title', () => {
  const { getByText } = render(
    <Router>
      <ButtonUpdatingUser />
    </Router>,
  );
  getByText('Modificar/Eliminar cuenta');
});
test('OnClick Correct', () => {
  render(
    <Router>
      <ButtonUpdatingUser />
    </Router>,
  );
  fireEvent.click(screen.getByText('Modificar/Eliminar cuenta'));
});

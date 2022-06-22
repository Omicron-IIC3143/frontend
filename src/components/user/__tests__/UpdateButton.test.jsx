import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonUpdatingUser from '../buttons/updateButton/UpdateButton';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <ButtonUpdatingUser />
    </Router>,
  );
  getByText('Modificar/Eliminar cuenta');
});

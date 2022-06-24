import React from 'react';
import { render } from '@testing-library/react';
import DeleteButton from '../buttons/deleteButton/DeleteButton';

test('Renders login title', () => {
  const { getByText } = render(<DeleteButton />);
  getByText('Eliminar usuario');
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteProjectButton from '../buttons/buttonDelete/ButtonDelete';

test('Renders ButtonDelete title', () => {
  const { getByText } = render(<DeleteProjectButton />);
  getByText('Eliminar proyecto');
});
test('OnClick Correct', () => {
  const { getByText } = render(<DeleteProjectButton />);
  fireEvent.click(getByText('Eliminar proyecto'));
});

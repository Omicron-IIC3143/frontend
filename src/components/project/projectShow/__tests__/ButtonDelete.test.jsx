import React from 'react';
import { render } from '@testing-library/react';
import DeleteProjectButton from '../buttons/buttonDelete/ButtonDelete';

test('Renders login title', () => {
  const { getByText } = render(<DeleteProjectButton />);
  getByText('Eliminar proyecto');
});

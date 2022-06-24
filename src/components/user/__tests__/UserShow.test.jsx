import React from 'react';
import { render } from '@testing-library/react';
import UserShow from '../userShow/UserShow';

test('Renders login title', () => {
  const { getByText } = render(<UserShow />);
  getByText('Rut:');
});

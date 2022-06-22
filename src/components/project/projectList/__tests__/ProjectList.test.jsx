import React from 'react';
import { render } from '@testing-library/react';
import ProjectList from '../ProjectList';

test('Renders login title', () => {
  const { container, getByText } = render(<ProjectList />);
  getByText('Ver en más detalle');
  expect(container.firstChild).toHaveClass('text-center');
});

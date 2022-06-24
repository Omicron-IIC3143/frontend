import React from 'react';
import { render } from '@testing-library/react';
import Searcher from '../searcher/Searcher';

test('Renders login title', () => {
  const { container, getByPlaceholderText } = render(<Searcher />);
  expect(getByPlaceholderText('Buscar Proyecto')).toBeInTheDocument();
  expect(container.firstChild).toHaveClass('col-stock-sale');
});

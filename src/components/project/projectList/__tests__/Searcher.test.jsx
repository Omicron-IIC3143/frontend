import React from 'react';
import { render } from '@testing-library/react';
import Searcher from '../searcher/Searcher';

test('Renders login title', () => {
  const { container, getByText } = render(<Searcher className="col-stock-sale" />);
  expect(getByText('Filtrar')).toBeInTheDocument();
  expect(container.firstChild).toHaveClass('col-stock-sale');
});

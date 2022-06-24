import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../Loading';

test('Renders login title', () => {
  const { container } = render(<Loading />);
  expect(container.firstChild).toHaveClass('rows-loading');
});

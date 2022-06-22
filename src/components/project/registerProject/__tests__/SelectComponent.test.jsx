import React from 'react';
import { render } from '@testing-library/react';
import SelectComponent from '../SelectComponent';

test('Renders login title', () => {
  const { container } = render(<SelectComponent />);
  expect(container.firstChild).toHaveClass(
    'center-info-multiple-select-tags',
  );
});

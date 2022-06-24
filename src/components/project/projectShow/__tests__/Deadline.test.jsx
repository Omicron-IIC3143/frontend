import React from 'react';
import { render } from '@testing-library/react';
import Deadline from '../deadline/Deadline';

test('Renders login title', () => {
  const { getByText } = render(<Deadline />);
  getByText(
    'El proyecto ya ha llegado a su tiempo límite de financiamiento.',
  );
});

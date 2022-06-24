import React from 'react';
import { render } from '@testing-library/react';
import ProjectImage from '../projectImage/ProjectImage';

test('Renders login title', () => {
  const { container } = render(<ProjectImage />);
  expect(container.firstChild).toHaveClass('cardImage');
});

import React from 'react';
import { render } from '@testing-library/react';
import ProjectDescription from '../fullDescriptionOfProject/FullDescriptionOfProject';

test('Renders login title', () => {
  const { container } = render(<ProjectDescription />);
  expect(container.firstChild).toHaveClass('descriptionOfProject');
});

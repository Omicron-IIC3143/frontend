import React from 'react';
import { render } from '@testing-library/react';
import FinancingInformation from '../financingInfo/FinancingInfo';

test('Renders login title', () => {
  const { container, getByText } = render(<FinancingInformation />);
  expect(container.firstChild).toHaveClass('infoOfFinancing');
  getByText('Financiamiento actual: $');
});

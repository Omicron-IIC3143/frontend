import React from 'react';
import { render } from '@testing-library/react';
import DepositButton from '../buttons/depositButton/DepositButton';

test('Renders login title', () => {
  const { getByText } = render(<DepositButton />);
  getByText('Depositar');
});

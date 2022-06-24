import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonLookFinancesUser from '../buttons/financeButton/FinanceButton';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <ButtonLookFinancesUser />
    </Router>,
  );
  getByText('Información financiera');
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonLookFinancesUser from '../buttons/financeButton/FinanceButton';

test('Renders Finance Button title', () => {
  const { getByText } = render(
    <Router>
      <ButtonLookFinancesUser />
    </Router>,
  );
  getByText('Información financiera');
});
test('OnClick Correct', () => {
  render(
    <Router>
      <ButtonLookFinancesUser />
    </Router>,
  );
  fireEvent.click(screen.getByText(/Información financiera/i));
});

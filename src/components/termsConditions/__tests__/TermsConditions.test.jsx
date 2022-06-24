import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TermsConditions from '../TermsConditions';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <TermsConditions />
    </Router>,
  );
  getByText('Bienvenida');
});

import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';

test('Renders login title', () => {
  const { getByText } = render(<Footer />);
  getByText('Términos y condiciones');
});

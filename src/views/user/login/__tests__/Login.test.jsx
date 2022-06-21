import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../Login';

test('Renders login title', () => {
  render(<Login />);
});

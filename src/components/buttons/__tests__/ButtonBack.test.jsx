import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonBack from '../buttonBack/ButtonBack';

test('Button Back title', () => {
  const { getByText } = render(
    <Router>
      <ButtonBack />
    </Router>,
  );
  getByText('Volver atrás');
});
test('OnClick Correct', () => {
  render(
    <Router>
      <ButtonBack />
    </Router>,
  );
  fireEvent.click(screen.getByText(/Volver atrás/i));
});

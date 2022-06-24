import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonSharing from '../buttons/buttonSharing/ButtonSharing';

test('Renders Button Sharing title', () => {
  const { getByText } = render(
    <Router>
      <ButtonSharing />
    </Router>,
  );
  getByText('Compartir Proyecto');
});
test('OnClick Correct', () => {
  const jsdomAlert = window.alert;
  window.alert = () => {};
  render(
    <Router>
      <ButtonSharing />
    </Router>,
  );
  fireEvent.click(screen.getByText('Compartir Proyecto'));
  window.alert = jsdomAlert;
});

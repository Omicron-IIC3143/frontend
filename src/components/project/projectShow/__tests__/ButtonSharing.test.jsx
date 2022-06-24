import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonSharing from '../buttons/buttonSharing/ButtonSharing';

test('Renders login title', () => {
  window.location.href = 'http://localhost:3000/project/1';
  const { getByText } = render(
    <Router>
      <ButtonSharing />
    </Router>,
  );
  getByText('Compartir Proyecto');
});
test('onClick correct', () => {
  // window.location.href = 'http://localhost:3000/project/1';
  const { getByText } = render(
    <Router>
      <ButtonSharing />
    </Router>,
  );
  getByText('Compartir Proyecto');
});

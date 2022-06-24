import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ButtonSharing from '../buttons/buttonSharing/ButtonSharing';

test('Renders login title', () => {
  const { getByText } = render(
    <Router>
      <ButtonSharing />
    </Router>,
  );
  getByText('Compartir Proyecto');
});

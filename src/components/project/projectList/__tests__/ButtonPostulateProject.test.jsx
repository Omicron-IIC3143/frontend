import React from 'react';
import { render } from '@testing-library/react';
import ButtonPostulate from '../buttonPostulateProject/ButtonPostulateProject';

test('Renders login title', () => {
  const { getByText } = render(<ButtonPostulate />);
  getByText('Postular Nuevo Proyecto');
});

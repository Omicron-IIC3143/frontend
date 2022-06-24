import React from 'react';
import { render } from '@testing-library/react';
import UserShow from '../userShow/UserShow';

test('Renders User Show - editorIsOtherUser = true', () => {
  const { getByText } = render(<UserShow editorIsOtherUser />);
  getByText('[Perfil de otro usuario]');
});
test('Renders User Show - editorIsOtherUser = false', () => {
  const { getByText } = render(<UserShow editorIsOtherUser={false} />);
  getByText('[Mi perfil]');
});

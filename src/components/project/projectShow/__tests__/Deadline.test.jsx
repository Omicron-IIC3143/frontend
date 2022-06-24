import React from 'react';
import { render } from '@testing-library/react';
import Deadline from '../deadline/Deadline';

test('Renders Deadline title - numberOfDaysDeadlineDate > 1', () => {
  const delay = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
  const { getByText } = render(<Deadline date={delay} />);
  getByText(
    'Al proyecto le quedan 2 días de financiamiento.',
  );
});
test('Renders Deadline title - numberOfDaysDeadlineDate <= 1', () => {
  const delay = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
  const { getByText } = render(<Deadline date={delay} />);
  getByText(
    'Al proyecto le queda menos de 1 día de financiamiento.',
  );
});
test('Renders Deadline title - numberOfDaysDeadlineDate < 0', () => {
  const delay = new Date(new Date().getTime() + -1 * 24 * 60 * 60 * 1000);
  const { getByText } = render(<Deadline date={delay} />);
  getByText(
    'El proyecto ya ha llegado a su tiempo límite de financiamiento.',
  );
});

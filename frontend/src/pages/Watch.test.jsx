// Small smoke test file for the Watch page (manual run only)
import React from 'react';
import { render } from '@testing-library/react';
import Watch from './Watch';

test('renders Watch component without crashing', () => {
  const { container } = render(<Watch />);
  expect(container).toBeTruthy();
});

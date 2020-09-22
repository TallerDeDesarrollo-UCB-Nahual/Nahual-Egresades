import React from 'react';
import { render } from '@testing-library/react';
import ImportModal from './ImportModal';

test('renders learn react link', () => {
  const { getByText } = render(<ImportModal />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

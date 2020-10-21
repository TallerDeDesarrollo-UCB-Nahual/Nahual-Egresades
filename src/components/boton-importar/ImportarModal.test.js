import React from 'react';
import { render } from '@testing-library/react';
import ImportarModal from './ImportarModal';

test('renders learn react link', () => {
  const { getByText } = render(<ImportarModal />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

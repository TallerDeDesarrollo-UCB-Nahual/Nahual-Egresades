import React from 'react';
import { render } from '@testing-library/react';
import ModalDeImportar from './ModalDeImportar';

test('renders learn react link', () => {
  const { getByText } = render(<ModalDeImportar />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

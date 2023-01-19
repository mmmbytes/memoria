import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Memoria', () => {
  render(<App />);
  const appHeader = screen.getByText("Memoria");
  expect(appHeader).toBeInTheDocument();
});

import {render, screen} from '@testing-library/react'
import App from './App';

test('renders', () => {
    render(<App />);
    const inputNode = screen.getByTestId('title')
    expect(inputNode).toBeTruthy();
});


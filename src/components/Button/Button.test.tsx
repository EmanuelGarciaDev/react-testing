import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Button } from './Button';
describe('<Button />', () => {
    it('should render the button', () => {
        render(<Button label="click" />);
        const buttonRole = screen.getByRole('button');
        expect(buttonRole).toBeInTheDocument();
    });
    it('should render the text in the button', () => {
        render(<Button label="click" />);
        const buttonText = screen.getByText('click');
        expect(buttonText).toBeInTheDocument();
    });
    it('should call onClick fn()', async () => {
        const handleClick = vi.fn();
        render(<Button label="click" onClick={handleClick} />);
        const button = screen.getByText('click');
        await act(() => {
            fireEvent.click(button);
            fireEvent.click(button);
        });
        expect(handleClick).toHaveBeenCalledTimes(2);
    })
});
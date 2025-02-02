import { describe, it, expect } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Counter } from "./Counter";

describe('<Counter />', () => { 
    it('should render counter initial value', () => {
        render(<Counter />);
        const counter = screen.getByText('Counter: 0');
        expect(counter).toBeInTheDocument();
    });
    it('should increment counter value', async () => {
        render(<Counter />);
        const button = screen.getByText('Increment');
        await act(() => {
            fireEvent.click(button);
        });
        const counter = screen.getByText('Counter: 1');
        expect(counter).toBeInTheDocument();
    });
})
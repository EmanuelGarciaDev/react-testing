import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Calculator } from "./Calculator";

describe("<Calculator />", () => {
    const testCases = [
        { a: 5, b: 3, operation: "add", result: "Result: 8" },
        { a: 5, b: 3, operation: "subtract", result: "Result: 2" },
        { a: 5, b: 3, operation: "multiply", result: "Result: 15" },
        { a: 6, b: 3, operation: "divide", result: "Result: 2" },
        { a: 6, b: 0, operation: "divide", result: "Result: Error" },
        { a: 6, b: 3, operation: "unknown", result: "Result: Invalid operation" },
    ];

    testCases.forEach(({ a, b, operation, result }) => {
        it(`should ${operation} ${a} and ${b} correctly`, () => {
            const { getByText } = render(<Calculator a={a} b={b} operation={operation} />);
            expect(getByText(result)).toBeInTheDocument();
        });
    });
});

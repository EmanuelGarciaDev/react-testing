import { describe, it, expect} from 'vitest';

describe('first test', () => {
    it('should add', () => {
        const sum = (a: number, b: number): number => a + b;
        const result = sum(2, 3)
        expect(result).toBe(5);
    });
    it('text should be equal', () => {
        const text = 'Vamo independiente';
        const text2 = 'Vamos independiente';
        expect(text).not.toBe(text2);
    })
});
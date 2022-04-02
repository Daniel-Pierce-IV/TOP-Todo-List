import Priority from './Priority';

describe('Priority', () => {
    test('has 2 types', () => {
        expect(Object.getOwnPropertyNames(Priority).length).toBe(2);
    });

    test('type property values are of type symbol', () => {
        for (const key in Priority) {
            expect(typeof Priority[key]).toBe('symbol');
        }
    });
});
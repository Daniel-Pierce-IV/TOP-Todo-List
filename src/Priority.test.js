import Priority from './Priority';

describe('Priority', () => {
    test('has 2 types', () => {
        expect(Object.getOwnPropertyNames(Priority).length).toBe(2);
    });
});
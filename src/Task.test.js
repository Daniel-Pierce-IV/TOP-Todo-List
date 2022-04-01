import Task from './Task';

describe('Tasks', () => {
    test('have a title', () => {
        const task = new Task('Some Title');
        expect(task.title).toBe('Some Title');
    });

    test('have a description', () => {
        const task = new Task('Some Title', { description: 'A neat description' });
        expect(task.description).toBe('A neat description');
    });
});
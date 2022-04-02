import Task from './Task';
import Priority from './Priority';

describe('Tasks', () => {
    test('have a title', () => {
        const task = new Task('Some Title');
        expect(task.title).toBe('Some Title');
    });

    test('can have a description', () => {
        const task = new Task('Some Title', { description: 'A neat description' });
        expect(task.description).toBe('A neat description');
    });

    test('can have a deadline', () => {
        const task = new Task('Some Title', { deadline: '2022-04-01' });
        expect(task.deadline).toBe('2022-04-01');
    });

    test('can have a note', () => {
        const task = new Task('Some Title', { note: 'A note about something' });
        expect(task.note).toBe('A note about something');
    });

    test('can have a priority', () => {
        const task = new Task('Some Title', { priority: Priority.HIGH });
        expect(task.priority).toBe(Priority.HIGH);
    });
});
import Task from './Task';
import Priority from './Priority';

describe('Tasks', () => {
  test('have a title', () => {
    const task = new Task('Some Title');
    expect(task.title).toBe('Some Title');
  });

  test('cant have an empty title', () => {
    expect(() => new Task('')).toThrowError('Task title must have a value');
  });

  test('can have a description', () => {
    const task = new Task('Some Title', { description: 'A neat description' });
    expect(task.description).toBe('A neat description');
  });

  test('can have a deadline', () => {
    const task = new Task('Some Title', { deadline: '2022-04-01' });
    expect(task.deadline).toBe('2022-04-01');
  });

  test('can have a priority', () => {
    const task = new Task('Some Title', { priority: Priority.HIGH });
    expect(task.priority).toBe(Priority.HIGH);
  });

  test('have a done status that defaults to false', () => {
    const task = new Task('Some Title');
    expect(task.isDone).toBe(false);
  });

  test('can be completed', () => {
    const task = new Task('Some Title');
    task.complete();

    expect(task.isDone).toBe(true);
  });
});

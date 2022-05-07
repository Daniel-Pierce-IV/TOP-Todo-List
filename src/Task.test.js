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

  test('can update the title', () => {
    const task = new Task('Some Title');
    task.title = 'New Title';
    expect(task.title).toBe('New Title');
  });

  test('can have a description', () => {
    const task = new Task('Some Title', { description: 'A neat description' });
    expect(task.description).toBe('A neat description');
  });

  test('can update the description', () => {
    const task = new Task('Some Title', { description: 'A neat description' });
    task.description = 'Something different';
    expect(task.description).toBe('Something different');
  });

  test('can have a deadline', () => {
    const task = new Task('Some Title', { deadline: '2022-04-01' });
    expect(task.deadline).toBe('2022-04-01');
  });

  test('can update the deadline', () => {
    const task = new Task('Some Title', { deadline: '2022-05-07' });
    task.deadline = '2022-05-08';
    expect(task.deadline).toBe('2022-05-08');
  });

  test('have a default priority', () => {
    const task = new Task('Some Title');
    expect(task.priority).toBe(Priority.LOW);
  });

  test('can have a priority', () => {
    const task = new Task('Some Title', { priority: Priority.HIGH });
    expect(task.priority).toBe(Priority.HIGH);
  });

  test('can update the priority', () => {
    const task = new Task('Some Title', { priority: Priority.LOW });
    task.priority = Priority.HIGH;
    expect(task.priority).toBe(Priority.HIGH);
  });

  test('cant set priority to non-enum value', () => {
    expect(
      () => new Task('Some Title', { priority: 'some text' })
    ).toThrowError('Task priority must be a value from the Priority enum');

    const task = new Task('Some Title', { priority: Priority.LOW });

    expect(() => (task.priority = 123)).toThrowError(
      'Task priority must be a value from the Priority enum'
    );
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

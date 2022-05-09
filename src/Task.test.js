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

  test('can initialize priority', () => {
    const task = new Task('Some Title', { priority: Priority.HIGH });
    expect(task.priority).toBe(Priority.HIGH);
  });

  test('can update the priority', () => {
    const task = new Task('Some Title');
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

  test('have unique ids', () => {
    // clear count increases from previous instantiations of other tests
    Task.count = 0;

    const task1 = new Task('Task #1');
    expect(task1.id).toBe(1);

    const task2 = new Task('Task #2');
    expect(task2.id).toBe(2);
  });

  test('can be converted to JSON', () => {
    // clear count increases from previous instantiations of other tests
    Task.count = 0;

    const task = new Task('Some Title', {
      description: 'A neat description',
      deadline: '2022-05-09',
      priority: Priority.HIGH,
      isDone: true,
    });

    expect(task.toJSON()).toEqual({
      id: 1,
      title: 'Some Title',
      description: 'A neat description',
      deadline: '2022-05-09',
      prioritySymbolKey: 'high',
      isDone: true,
    });

    task.title = 'Different Title';
    task.description = 'Something different';
    task.deadline = '3000-01-01';
    task.priority = Priority.LOW;

    expect(task.toJSON()).toEqual({
      id: 1,
      title: 'Different Title',
      description: 'Something different',
      deadline: '3000-01-01',
      prioritySymbolKey: 'low',
      isDone: true,
    });
  });
});

import Project from './Project';
import Task from './Task';

describe('Projects', () => {
  test('have a title', () => {
    const project = new Project('Project Title');
    expect(project.title).toBe('Project Title');
  });

  test('cant have an empty title', () => {
    expect(() => new Project('')).toThrowError(
      'Project title must have a value'
    );
  });

  test('can update the title', () => {
    const project = new Project('Project Title');
    project.title = 'New Title';
    expect(project.title).toBe('New Title');
  });

  test('can have tasks', () => {
    const project = new Project('Project Title', [
      new Task('Task #1'),
      new Task('Task #2'),
    ]);

    expect(project.tasks.length).toBe(2);
    expect(project.tasks[0].title).toBe('Task #1');
    expect(project.tasks[1].title).toBe('Task #2');
  });

  test("task array can't be directly externally modified", () => {
    const oldTask = new Task('Task #1');
    const newTask = new Task('Task #2');
    const project = new Project('Project Title', [oldTask]);

    project.tasks[0] = newTask;

    expect(project.tasks[0]).toBe(oldTask);
  });

  test('can add tasks', () => {
    const project = new Project('Project Title');

    expect(project.tasks.length).toEqual(0);

    project.addTask(new Task('Project Task #1'));

    expect(project.tasks.length).toEqual(1);
    expect(project.tasks[0].title).toEqual('Project Task #1');

    project.addTask(new Task('Project Task #2'));

    expect(project.tasks.length).toEqual(2);
    expect(project.tasks[1].title).toEqual('Project Task #2');
  });
});

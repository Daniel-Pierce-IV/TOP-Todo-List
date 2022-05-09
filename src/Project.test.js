import Project from './Project';
import Task from './Task';

describe('Projects', () => {
  afterEach(() => {
    // Reset Project's static properties
    Project.count = 0;
  });

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

  test('can remove tasks', () => {
    const taskToRemove = new Task('Remove Me!');
    let taskArray = [
      new Task('random #1'),
      taskToRemove,
      new Task('random #2'),
    ];

    const project = new Project('Project Title', [...taskArray]);
    project.removeTask(taskToRemove);

    expect(project.tasks[0].title).toBe(taskArray[0].title);
    expect(project.tasks[1].title).toBe(taskArray[2].title);
  });

  test('have unique ids', () => {
    const project1 = new Project('Project #1');
    expect(project1.id).toBe(1);

    const project2 = new Project('Project #2');
    expect(project2.id).toBe(2);
  });

  test('can be converted to JSON', () => {
    const project = new Project('My Title');

    expect(project.toJSON()).toEqual({
      id: 1,
      title: 'My Title',
      tasks: [],
    });

    project.title = 'New Title';
    project.addTask(new Task('Some Task'));

    expect(project.toJSON()).toEqual({
      id: 1,
      title: 'New Title',
      tasks: [
        {
          id: 1,
          title: 'Some Task',
          description: undefined,
          deadline: undefined,
          prioritySymbolKey: 'low',
          isDone: false,
        },
      ],
    });
  });

  test('JSON ids increment on each instantiation', () => {
    expect(new Project('First').toJSON().id).toBe(1);
    expect(new Project('Second').toJSON().id).toBe(2);
  });

  test('can be converted from JSON', () => {
    const projectJSON = {
      id: 12,
      title: 'Project Title',
      tasks: [
        {
          id: 3,
          title: 'Task #1',
          description: 'A short description, if needed',
          deadline: '2022-05-09',
          prioritySymbolKey: 'low',
          isDone: false,
        },
        {
          id: 7,
          title: 'Task #2',
          description:
            'This one is high priority, which is why the checkbox is red!',
          deadline: '2022-05-10',
          prioritySymbolKey: 'high',
          isDone: false,
        },
      ],
    };

    const project = Project.fromJSON(projectJSON);

    expect(project.id).toBe(12);
    expect(project.title).toBe('Project Title');
    expect(project.tasks[0].id).toBe(3);
    expect(project.tasks[1].id).toBe(7);
  });
});

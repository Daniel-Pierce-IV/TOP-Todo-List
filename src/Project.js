import Task from './Task';

export default class Project {
  static count = 0;

  #id;
  #title;
  #tasks;

  constructor(title, tasks = []) {
    this.#id = ++Project.count;
    this.title = title;
    this.#tasks = tasks;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    if (!value) throw new Error('Project title must have a value');
    this.#title = value;
  }

  get tasks() {
    return [...this.#tasks];
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  removeTask(task) {
    this.#tasks = this.#tasks.filter((element) => element !== task);
  }

  toJSON() {
    return {
      id: 1,
      title: this.#title,
      tasks: this.tasks.map((task) => task.toJSON()),
    };
  }

  static fromJSON(json) {
    Project.count = json.id - 1;

    return new Project(
      json.title,
      json.tasks.map((taskJSON) => Task.fromJSON(taskJSON))
    );
  }
}

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
}

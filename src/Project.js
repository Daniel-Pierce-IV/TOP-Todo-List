export default class Project {
  #title;
  #tasks;

  constructor(title, tasks = []) {
    this.#title = title;
    this.#tasks = tasks;
  }

  get title() {
    return this.#title;
  }

  get tasks() {
    return [...this.#tasks];
  }

  addTask(task) {
    this.#tasks.push(task);
  }
}

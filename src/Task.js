export default class Task {
  #title;
  #description;
  #deadline;
  #priority;
  #isDone;

  constructor(title, { description, deadline, priority, isDone = false } = {}) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.#priority = priority;
    this.#isDone = isDone;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    if (!value) throw new Error('Task title must have a value');
    this.#title = value;
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    this.#description = value;
  }

  get deadline() {
    return this.#deadline;
  }

  set deadline(value) {
    this.#deadline = value;
  }

  get priority() {
    return this.#priority;
  }

  get isDone() {
    return this.#isDone;
  }

  complete() {
    this.#isDone = true;
  }
}

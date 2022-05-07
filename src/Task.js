export default class Task {
  #title;
  #description;
  #deadline;
  #priority;
  #isDone;

  constructor(title, { description, deadline, priority, isDone = false } = {}) {
    this.#title = title;
    this.#description = description;
    this.#deadline = deadline;
    this.#priority = priority;
    this.#isDone = isDone;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get deadline() {
    return this.#deadline;
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

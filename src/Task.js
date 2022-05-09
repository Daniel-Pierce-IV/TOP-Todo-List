import Priority from './Priority';

export default class Task {
  static count = 0;

  #id;
  #title;
  #description;
  #deadline;
  #priority;
  #isDone;

  constructor(title, { description, deadline, priority, isDone = false } = {}) {
    this.#id = ++Task.count;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.#isDone = isDone;
  }

  get id() {
    return this.#id;
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

  set priority(value = Priority.LOW) {
    if (Object.values(Priority).includes(value)) {
      this.#priority = value;
    } else {
      throw new Error('Task priority must be a value from the Priority enum');
    }
  }

  get isDone() {
    return this.#isDone;
  }

  complete() {
    this.#isDone = true;
  }

  toJSON() {
    return {
      id: 1,
      title: this.#title,
      description: this.#description,
      deadline: this.#deadline,
      prioritySymbolKey: Symbol.keyFor(this.#priority),
      isDone: this.#isDone,
    };
  }

  static fromJSON(json) {
    Task.count = json.id - 1;

    return new Task(json.title, {
      description: json.description,
      deadline: json.deadline,
      priority: Symbol.for(json.prioritySymbolKey),
      isDone: json.isDone,
    });
  }
}

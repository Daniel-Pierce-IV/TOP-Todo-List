export default class {
    #title;
    #description;
    #deadline;
    #note;
    #priority;
    #subtasks;
    #isDone;
    
    constructor(title, {
            description,
            deadline,
            note,
            priority,
            subtasks = [],
            isDone = false
        } = {}){

        this.#title = title;
        this.#description = description;
        this.#deadline = deadline;
        this.#note = note;
        this.#priority = priority;
        this.#subtasks = subtasks;
        this.#isDone = isDone;
    }

    get title(){
        return this.#title;
    }

    get description(){
        return this.#description;
    }

    get deadline(){
        return this.#deadline;
    }

    get note(){
        return this.#note;
    }

    get priority(){
        return this.#priority;
    }

    get subtasks(){
        return [...this.#subtasks];
    }

    get isDone(){
        return this.#isDone;
    }

    complete(){
        this.#isDone = true;
    }

    addSubtask(task){
        return this.#subtasks.push(task);
    }
}
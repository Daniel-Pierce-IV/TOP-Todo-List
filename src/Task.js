export default class {
    #title;
    #options;
    
    constructor(title, options = {}){
        this.#title = title;
        this.#options = options;
    }

    get title(){
        return this.#title;
    }

    get description(){
        return this.#options.description;
    }

    get deadline(){
        return this.#options.deadline;
    }

    get note(){
        return this.#options.note;
    }
}
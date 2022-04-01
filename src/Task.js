export default class {
    #title;
    #description;
    
    constructor(title, description){
        this.#title = title;
        this.#description = description;
    }

    get title(){
        return this.#title;
    }

    get description(){
        return this.#description;
    }
}
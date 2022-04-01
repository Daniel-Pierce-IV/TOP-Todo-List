export default class {
    #title;
    
    constructor(title){
        this.#title = title;
    }

    get title(){
        return this.#title;
    }
}
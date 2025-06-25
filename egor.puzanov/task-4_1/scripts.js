class Recipie {
    #title = "Заголовок";
    #ingredients = [];
    #steps = [];

    constructor(title="", ingredients=[], steps=[]){
        if(typeof(title) !== "string"){
            throw new TypeError(message=`Incorrect type of "title": ${typeof(title)}, expected "string"`);
        }
        if(!Array.isArray(ingredients) || ingredients.some(el => typeof(el) !== "string")){
            throw new TypeError(message=`"ingredients" must be: array of "string"`);
        }
        if(!Array.isArray(steps) || steps.some(el => typeof(el) !== "string")){
            throw new TypeError(message=`"steps" must be: array of "string"`);
        }
        this.#title=title;
        this.#ingredients=ingredients;
        this.#steps=steps;
    }

    addIngredient(ingredient){
        if(typeof(ingredient) !== "string"){
            throw new TypeError(message=`Incorrect type: ${typeof(ingredient)}, expected "string"`);
        }
        this.#ingredients.push(ingredient);
    }

    removeIngredient(ingredient){
        if(typeof(ingredient) !== "string"){
            throw new TypeError(message=`Incorrect type: ${typeof(ingredient)}, expected "string"`);
        }
        const index = this.#ingredients.indexOf(ingredient);
        if (index > -1) {
            this.#ingredients.splice(index, 1);
        }
        else{
            throw new Error(message=`element "${ingredient}" in not in the list`)
        }

    }



    get ingredientCount() {
        return this.#ingredients.length;
    }

    get title() {
        return this.#title;
    }

    get ingredients() {
        return this.#ingredients;
    }

    get steps() {
        return this.#steps;
    }

    set title(title) {
        if(typeof(title) !== "string"){
            throw new TypeError(message=`Incorrect type of "title": ${typeof(title)}, expected "string"`);
        }
        this.#title=title;
    }

    set ingredients(ingredients) {
        if(!Array.isArray(ingredients) || ingredients.some(el => typeof(el) !== "string")){
            throw new TypeError(message=`"ingredients" must be: array of "string"`);
        }
        this.#ingredients=ingredients;
    }

    set steps(steps) {
        if(!Array.isArray(steps) || steps.some(el => typeof(el) !== "string")){
            throw new TypeError(message=`"steps" must be: array of "string"`);
        }
        this.#steps=steps;
    }

    toString(){
        return `{
    title: ${this.#title},
    ingridients: [${this.#ingredients.join(", ")}],
    steps: [${this.steps.join(", ")}]
}`
    }
}

a = new Recipie(title="рецепт 1", ingredients=['ингредиент 1', 'ингредиент 2'], steps=['шаг 1', 'шаг 2']);
console.log(a.toString());
a.addIngredient("ингредиент 3");
a.removeIngredient("ингредиент 1");
console.log(a.toString());
console.log(a.ingredientCount);
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

    addStep(step){
        if(typeof(step) !== "string"){
            throw new TypeError(message=`Incorrect type: ${typeof(step)}, expected "string"`);
        }
        this.#steps.push(step);
    }

    removeStep(step){
        if(typeof(step) !== "string"){
            throw new TypeError(message=`Incorrect type: ${typeof(step)}, expected "string"`);
        }
        const index = this.#steps.indexOf(step);
        if (index > -1) {
            this.#steps.splice(index, 1);
        }
        else{
            throw new Error(message=`element "${step} in not in the list"`)
        }

    }

    get ingredientCount() {
        return this.#ingredients.length;
    }

    get stepCount() {
        return this.#steps.length;
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

    toJSON(){
        return{
            "title": this.#title,
            "ingredients": this.#ingredients,
            "steps": this.#steps
        }
    }
}
//группирует рецепты по количеству ингредиентов
function groupByIngredientsLen(recepies){

    // return Object.groupBy(recepies, ({ingredientCount}) => ingredientCount)
    const res = {};
    recepies.forEach(recepie => {
        try{
            res[recepie.ingredientCount].push(recepie);
        }
        catch{
            res[recepie.ingredientCount] = [recepie];
        }
    })
    
    return res;
}

//возвращает уникальный список всех ингредиентов
function getIngredientSet(recepies){
    const res = new Set();
    recepies.forEach(recepie => {
        recepie.ingredients.forEach(ingredient => {
            res.add(ingredient);
        })
    });
    return res;
}

function fillterByIngredient(recepies, ingredient){
    return recepies.filter(recepie => recepie.ingredients.includes(ingredient));
}

//группирует рецепты по длине списка шагов
function groupByStepsLen(recepies){

    // return Object.groupBy(recepies, ({stepCount}) => stepCount)
    const res = {};
    recepies.forEach(recepie => {
        try{
            res[recepie.stepCount].push(recepie);
        }
        catch{
            res[recepie.stepCount] = [recepie];
        }
    })

    return res;
}

function getAllTitles(recepies){
    return recepies.map(recepie => recepie.title);
}

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
            throw new Error(message=`element "${ingredient} in not in the list"`)
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
}

const a = new Recipie("рецепт 1", ['ингредиент 1', 'ингредиент 2'], ['шаг 1', 'шаг 2']);
const b = new Recipie("рецепт 2", ['ингредиент 1', 'ингредиент 2'], ['шаг 1', 'шаг 2', 'шаг 3']);
const c = new Recipie("рецепт 3", ['ингредиент 1', 'ингредиент 4', 'ингредиент 3'], ['шаг 1', 'шаг 2', 'шаг 3']);
const d = new Recipie("рецепт 4", ['ингредиент 1', 'ингредиент 4', 'ингредиент 3'], ['шаг 1', 'шаг 2']);

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

console.log("По длине ингрeдиентов");
const res1 = groupByIngredientsLen([a, b, c, d]);
console.log("-------------------------------------");
Array.from(Object.keys(res1)).forEach(key => {
    console.log(key);
    res1[key].forEach(el => console.log(el.toString()));
    console.log("-------------------------------------");
});

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


console.log();
console.log("Уникальные  ингредиенты");
console.log(getIngredientSet([a, b, c, d]));
console.log("-------------------------------------");


function fillterByIngredient(recepies, ingredient){
    return recepies.filter(recepie => recepie.ingredients.includes(ingredient));
}

console.log();
console.log("Содержащие  ингредиент 'ингредиент 1'");
fillterByIngredient([a, b, c, d], "ингредиент 1").forEach(el => {
    console.log(el.toString());
})
console.log();
console.log("Содержащие  ингредиент 'ингредиент 3'");
fillterByIngredient([a, b, c, d], "ингредиент 3").forEach(el => {
    console.log(el.toString());
})

console.log("-------------------------------------");

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


console.log();
console.log("По длине шагов");
const res = groupByStepsLen([a, b, c, d]);
Array.from(Object.keys(res)).forEach(key => {
    console.log(key);
    res[key].forEach(el => console.log(el.toString()));
    console.log("-------------------------------------");
});

function getAllTitles(recepies){
    return recepies.map(recepie => recepie.title);
}

console.log();
console.log("Названия рецептов");
console.log(getAllTitles([a, b, c, d]))

console.log("-------------------------------------");
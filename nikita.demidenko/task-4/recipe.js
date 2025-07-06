class recipe {
    title; // String
    ingredients; // String array
    steps; // String array

    constructor(title, ingredients, steps) {
        this.title = title;
        this.ingredients = ingredients;
        this.steps = steps;
    }

    addIngredient(ingredient) {
        this.#addItem("ingredients", ingredient);
    }

    removeIngredient(ingredient) {
        return this.#removeItem("ingredients", ingredient);
    }

    addStep(step) {
        this.#addItem("steps", step);
    }

    removeStep(step) {
        return this.#removeItem("steps", step)
    }

    get ingredientCount() {
        return this.ingredients.length;
    }

    #addItem(key, item) {
        this[key].push(item);
    }

    #removeItem(key, item) {
        let idx = this[key].indexOf(item);
        if (idx === -1) {
            return false;
        }
        this[key].splice(idx, 1);
        return true;
    }
}
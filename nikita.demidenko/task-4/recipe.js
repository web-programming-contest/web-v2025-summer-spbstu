class Recipe {
    title; // String
    ingredients; // String array
    steps; // String array

    constructor(title, ingredients, steps) {
        this.title = title;
        this.ingredients = ingredients;
        this.steps = steps;
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    removeIngredient(ingredient) {
        let idx = this.ingredients.indexOf(ingredient);
        if (idx === -1) {
            return false;
        }
        this.ingredients.splice(idx, 1);
        return true;
    }

    addStep(step) {
        this.steps.push(step);
    }

    removeStep(step) {
        let idx = this.steps.indexOf(step);
        if (idx === -1) {
            return false;
        }
        this.steps.splice(idx, 1);
        return true;
    }

    get ingredientCount() {
        return this.ingredients.length;
    }
}
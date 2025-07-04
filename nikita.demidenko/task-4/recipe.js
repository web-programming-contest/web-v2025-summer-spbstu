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
        this.ingredients.push(ingredient)
    }

    removeIngredient(ingredient) {
        let ingredientIdx = this.ingredients.indexOf(ingredient);
        if (ingredientIdx == -1) {
            return false;
        }
        this.ingredients.splice(ingredientIdx, 1);
        return true;
    }

    get ingredientCount() {
        return this.ingredients.length;
    }
}
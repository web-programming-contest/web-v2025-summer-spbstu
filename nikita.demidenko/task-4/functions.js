import { recipe } from "./recipe.js";

function groupByIngredientCount(recipes) {
    return Map.groupBy(recipes, r => r.ingredientCount);
}

function uniqueIngredients(recipes) {
    return Array.from(new Set(recipes.flatMap(r => r.ingredients)));
}

function filterByIngredient(recipes, ingredient) {
    return recipes.filter(r => r.ingredients.includes(ingredient));
}

function groupByStepCount(recipes) {
    return Map.groupBy(recipes, r => r.steps.length);
}

function recipesNames(recipes) {
    return recipes.map(r => r.title);
}

// tests
let recipes = [
    new recipe("Суп", ["Вода", "Макароны", "Бульонный кубик"], ["1", "2", "3"]),
    new recipe("Макароны", ["Вода", "Макароны"], ["1", "2"]),
    new recipe("Чай", ["Вода", "Чайный покетик"], ["1"]),
    new recipe("Салат", ["Огурцы", "Помидоры", "Перец", "Салат Айсберг"], ["1", "2", "3"]),
];

console.log(groupByIngredientCount(recipes));
console.log(uniqueIngredients(recipes));
console.log(filterByIngredient(recipes, "Макароны"));
console.log(groupByStepCount(recipes));
console.log(recipesNames(recipes));

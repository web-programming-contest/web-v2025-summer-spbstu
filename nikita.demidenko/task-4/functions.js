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
let testRecipes = [
    new recipe("Суп", ["Вода", "Макароны", "Бульонный кубик"], ["1", "2", "3"]),
    new recipe("Макароны", ["Вода", "Макароны"], ["1", "2"]),
    new recipe("Чай", ["Вода", "Чайный покетик"], ["1"]),
    new recipe("Салат", ["Огурцы", "Помидоры", "Перец", "Салат Айсберг"], ["1", "2", "3"]),
];

console.log(groupByIngredientCount(testRecipes));
console.log(uniqueIngredients(testRecipes));
console.log(filterByIngredient(testRecipes, "Макароны"));
console.log(groupByStepCount(testRecipes));
console.log(recipesNames(testRecipes));

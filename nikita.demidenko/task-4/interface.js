let formTitle = document.getElementById("title");
let formIngredients = document.getElementById("ingredients");
let formSteps = document.getElementById("steps");
handleGrowableList(formIngredients);
handleGrowableList(formSteps);
let newRecipeButton = document.getElementById("newRecipe");
let recipeCards = document.getElementById("recipes");
let recipes = [];
newRecipeButton.addEventListener("click", event => {
    event.preventDefault();
    let [title, ingredients, steps] = [
        formTitle.value,
        growableListValues(formIngredients),
        growableListValues(formSteps),
    ];
    if (title && ingredients && steps &&
        ingredients.length !== 0 && steps.length !== 0) {
            let newRecipe = new recipe(title, ingredients, steps);
        recipes.push(newRecipe);
        formTitle.value = '';
        clearGrowableList(formIngredients);
        clearGrowableList(formSteps);
        recipeCards.appendChild(createNewRecipeCard(newRecipe));
    }
});

function handleGrowableList(list) {
    let action = "input";
    let currentField = () => list.lastElementChild.firstElementChild;
    currentField().addEventListener(action, function addField() {
        currentField().removeEventListener(action, addField);
        let newListItem = document.createElement("li");
        let newField = document.createElement("input");
        newField.addEventListener(action, addField);
        newListItem.appendChild(newField);
        list.appendChild(newListItem);
    });
}

function growableListValues(list) {
    return Array.from(list.getElementsByTagName("input")).map((e) => e.value)
        .filter(Boolean);
}

function clearGrowableList(list) {
    list.firstElementChild.firstElementChild.value = '';
    while (list.firstElementChild !== list.lastElementChild) {
        list.removeChild(list.lastElementChild);
    }
    handleGrowableList(list);
}

function createNewRecipeCard(r) {
    let card = document.getElementById("recipeCard").content.cloneNode(true);
    let title = card.querySelector("h1");
    let [ingredients, steps] = card.querySelectorAll("ol");
    title.innerText = r.title;
    ingredients.append(...r.ingredients.map(i => {
        let newIngredient = document.createElement("li");
        newIngredient.innerText = i;
        return newIngredient;
    }));
    steps.append(...r.steps.map(s => {
        let newStep = document.createElement("li");
        newStep.innerText = s;
        return newStep;
    }));
    return card;
}
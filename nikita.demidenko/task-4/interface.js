let formTitle = document.getElementById("title");
let formIngredients = document.getElementById("ingredients");
let formSteps = document.getElementById("steps");
handleGrowableList(formIngredients);
handleGrowableList(formSteps);
let newRecipeButton = document.getElementById("newRecipe");
let recipeCards = document.getElementById("recipes");
let recipes = [];
loadRecipes().then((loaded) => {
    recipes = loaded;
    recipeCards.append(...recipes.map(createNewRecipeCard));
});
newRecipeButton.addEventListener("click", (event) => {
    event.preventDefault();
    let [title, ingredients, steps] = [
        formTitle.value,
        growableListValues(formIngredients),
        growableListValues(formSteps),
    ];
    if (
        title && ingredients && steps &&
        ingredients.length !== 0 && steps.length !== 0
    ) {
        let newRecipe = new Recipe(title, ingredients, steps);
        recipes.push(newRecipe);
        storeRecipes(recipes);
        formTitle.value = "";
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
    list.firstElementChild.firstElementChild.value = "";
    while (list.firstElementChild !== list.lastElementChild) {
        list.removeChild(list.lastElementChild);
    }
    handleGrowableList(list);
}

function createNewRecipeCard(recipe) {
    let card = document.getElementById("recipeCard").content.cloneNode(true)
        .firstElementChild;
    let title = card.querySelector("h1");
    let [ingredients, steps] = card.querySelectorAll("ol");
    let [addIngredientButton, addStepButton, removeRecipeButton] = card
        .querySelectorAll("button");
    let [ingredientInput, stepInput] = card.querySelectorAll("input");
    title.innerText = recipe.title;
    ingredients.append(
        ...recipe.ingredients.map((i) =>
            createListItem(i, () => {
                recipe.removeIngredient(i);
                storeRecipes(recipes);
            })
        ),
    );
    steps.append(
        ...recipe.steps.map((s) =>
            createListItem(s, () => {
                recipe.removeStep(s);
                storeRecipes(recipes);
            })
        ),
    );
    addIngredientButton.addEventListener("click", () => {
        let newIngredient = ingredientInput.value;
        if (newIngredient) {
            recipe.addIngredient(newIngredient);
            storeRecipes(recipes);
            ingredients.appendChild(
                createListItem(newIngredient, () => {
                    recipe.removeIngredient(newIngredient);
                    storeRecipes(recipes);
                }),
            );
            ingredientInput.value = "";
        }
    });
    addStepButton.addEventListener("click", () => {
        let newStep = stepInput.value;
        if (newStep) {
            recipe.addStep(newStep);
            storeRecipes(recipes);
            steps.appendChild(createListItem(newStep, () => {
                recipe.removeStep(newStep);
                storeRecipes(recipes);
            }));
            stepInput.value = "";
        }
    });
    removeRecipeButton.addEventListener("click", () => {
        card.remove();
        removeRecipe(recipe);
        storeRecipes(recipes);
    });
    return card;
}

function createListItem(item, onRemove) {
    let newItem =
        document.getElementById("recipeCardItem").content.cloneNode(true)
            .firstElementChild;
    let button = newItem.querySelector("button");
    button.before(item);
    button.addEventListener("click", () => {
        newItem.remove();
        onRemove();
    });
    return newItem;
}

function removeRecipe(recipe) {
    let idx = recipes.indexOf(recipe);
    if (idx !== -1) {
        recipes.splice(idx, 1);
    }
}

function loadRecipes() {
    let loadedRecipes;
    return new Promise((resolve) => {
        setTimeout(() => {
            let temp = localStorage.getItem("recipes");
            if (!temp) {
                loadedRecipes = [];
            } else {
                loadedRecipes = JSON.parse(temp).map(raw => Object.assign(new Recipe, raw));
            }
            resolve(loadedRecipes);
        }, 1000);
    });
}

function storeRecipes(recipes) {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("recipes", JSON.stringify(recipes));
            resolve();
        }, 1000);
    });
}

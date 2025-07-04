let title = document.getElementById("title");
let ingredients = document.getElementById("ingredients");
let steps = document.getElementById("steps");
handleGrowableList(ingredients);
handleGrowableList(steps);
let newRecipeButton = document.getElementById("newRecipe");
let recipes = [];
newRecipeButton.addEventListener("click", function (e) {
    e.preventDefault();
    let [t, i, s] = [
        title.value,
        growableListValues(ingredients),
        growableListValues(steps),
    ];
    if (t && i && s && i.length !== 0 && s.length !== 0) {
        recipes.push(
            new recipe(t, i, s),
        );
        title.value = '';
        clearGrowableList(ingredients);
        clearGrowableList(steps);
    }
});

function handleGrowableList(list) {
    let action = "keydown";
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
}

class Recipe {
    constructor(title, ingredients = [], steps = []) {
        this.title = title;
        this.ingredients = ingredients;
        this.steps = steps;
        this.id = Date.now().toString();
    }

    async addIngredient(ingredient) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!this.ingredients.includes(ingredient)) {
                    this.ingredients.push(ingredient);
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 300);
        });
    }

    async removeIngredient(ingredient) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = this.ingredients.indexOf(ingredient);
                if (index !== -1) {
                    this.ingredients.splice(index, 1);
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 300);
        });
    }

    async addStep(step) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.steps.push(step);
                resolve(true);
            }, 300);
        });
    }

    async removeStep(index) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (index >= 0 && index < this.steps.length) {
                    this.steps.splice(index, 1);
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 300);
        });
    }

    get ingredientCount() {
        return this.ingredients.length;
    }

    get stepCount() {
        return this.steps.length;
    }
}
  
function groupRecipesByIngredientCount(recipes) {
    return recipes.reduce((acc, recipe) => {
        const count = recipe.ingredientCount;
        if (!acc[count]) {
        acc[count] = [];
        }
        acc[count].push(recipe);
        return acc;
    }, {});
}

function getAllUniqueIngredients(recipes) {
    const ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
        ingredientsSet.add(ingredient);
        });
    });
    return Array.from(ingredientsSet);
}

function getRecipesByIngredient(recipes, ingredient) {
    return recipes.filter(recipe => 
        recipe.ingredients.includes(ingredient)
    );
}

function groupRecipesByStepCount(recipes) {
    return recipes.reduce((acc, recipe) => {
        const count = recipe.steps.length;
        if (!acc[count]) {
        acc[count] = [];
        }
        acc[count].push(recipe);
        return acc;
    }, {});
}

function getAllRecipeNames(recipes) {
    return recipes.map(recipe => recipe.title);
}

function loadRecipes() {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
        const parsed = JSON.parse(savedRecipes);
        recipes = parsed.map(r => new Recipe(
            r.title, 
            r.ingredients, 
            r.steps
        ));
    }
}

function saveRecipes() {
    console.log("saving file");
    localStorage.setItem('recipes', JSON.stringify(recipes));
}
function createRecipeObject(recipeName){
    if(recipes.hasOwnProperty(recipeName) && recipes[recipeName] !== undefined){
        const recipeList = document.getElementById("recipes-list");
        if(!recipeList){
        console.log("ЭЛЕМЕНТ \"recipes-list\" НЕ НАЙДЕН");
        return;
        }

        //ничего не делаем если рецепт уже есть
        if(document.getElementById(recipeName)){
        return;
        }

        const recipediv = document.createElement("div");
        var p = document.createElement("p");
        recipediv.setAttribute("class", "parent");
        recipediv.setAttribute("id", recipeName);
        p.textContent = recipeName;
        p.style.textAlign = "center";
        recipediv.appendChild(p);
        
        var styles = {
            height: "50%",
            margin: "10px",
            padding: "10px",
            fontSize : "20px"
        };
        //создаем контейнер для ингредиентов
        const ingrDiv = document.createElement("div");
        const stpDiv = document.createElement("div");

        
        p = document.createElement("p");
        
        stpDiv.setAttribute("id", "prepSteps");
        ingrDiv.setAttribute("id", "ingredients");

        for(const stle of Object.keys(styles)){
            if(stpDiv.style.hasOwnProperty(stle)){
                stpDiv.style[stle] = styles[stle];
                ingrDiv.style[stle] = styles[stle];
            }
        }
        
        p.textContent = "ИНГРЕДИНЕТЫ";
        ingrDiv.appendChild(p);

        //готовим список
        var ul = document.createElement("ul");

        for(const ingr of recipes[recipeName].ingredients){//добавить ингредиенты в список
            var li = document.createElement("li");
            var tmpdiv = document.createElement("div");
            var button = document.createElement("button");
            button.textContent = "X";
            li.textContent = ingr;
            button.setAttribute("class", "removeIngr");
            updateButtonEventListener(button);
            button.style.backgroundColor = "red";
            button.textContent = "X";
            tmpdiv.appendChild(li);
            tmpdiv.appendChild(button);
            ul.appendChild(tmpdiv);
        }
        ingrDiv.appendChild(ul);

        //список для шагов
        ul = document.createElement("ul");

        //контейнер для шагов
        p = document.createElement("p");
        p.textContent = "ШАГИ ПРИГОТОВЛЕНИЯ";
        stpDiv.appendChild(p);
        for(const step of recipes[recipeName].steps){//добавить шаги в список
            var li = document.createElement("li");
            var tmpdiv = document.createElement("div");
            var button = document.createElement("button");
            button.textContent = "X";
            li.textContent = ingr;
            button.setAttribute("class", "removeStep");
            updateButtonEventListener(button);
            button.style.backgroundColor = "red";
            button.textContent = "X";
            tmpdiv.appendChild(li);
            tmpdiv.appendChild(button);
            ul.appendChild(tmpdiv);
        }
        
        stpDiv.appendChild(ul);
        var button = document.createElement("button");

        button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","remRecipe");
        button.setAttribute("value",recipeName);
        updateButtonEventListener(button);
        
        button.textContent = "Удалить";
        button.style.backgroundColor = "red";
        button.style.border = "none";

        //добавляем ингредиенты и шаги в контейнер
        recipediv.appendChild(ingrDiv);
        recipediv.appendChild(stpDiv);
        recipediv.appendChild(button);

        recipeList.appendChild(recipediv);
    }
}

function updateButtonEventListener(button){
    button.addEventListener("click", () => {
        attr = button.getAttribute("class");
        if(attr === "remRecipe"){
            callbacks.remove(button.value);
        }
        else if(attr === "removeIngr"){
            console.log("УДАЛЕНИЕ ИНГРЕДИЕНТА");
            if(recipes.hasOwnProperty(button.value)){
                recipes[button.value].removeIngredient(button.getAttribute("name"));
                var par = button.parentElement;
                par.parentElement.removeChild(par);
                saveRecipes();
            }
        }
        else if(attr === "removeStep"){
            console.log("УДАЛЕНИЕ ШАГА");
            if(recipes.hasOwnProperty(button.value)){
                recipes[button.value].removeStep(button.getAttribute(Number("data-stepI") - 1));
                var par = button.parentElement;
                par.parentElement.removeChild(par);
                saveRecipes();
            }
        }
    });
}

function updateRecipe(Name, field, value){
    const par = document.getElementById(Name);
    if(par){
        
        const fildDiv = par.childNodes;
        if(fildDiv.length !== 0){
            for(const node of fildDiv){
                if(node.getAttribute("id") === field ){
                    var ul = node.getElementsByTagName("ul");
                    if(ul.length !== 0){
                        ul = ul.item(0);
                        var li = document.createElement("li");
                        var tmpdiv = document.createElement("div");
                        var button = document.createElement("button");
                        button.textContent = "X";
                        li.textContent = value;
                        
                        if(field === "ingredients"){
                            button.setAttribute("class", "removeIngr");
                            button.setAttribute("name", value);
                        }
                        else if(field === "prepSteps"){
                            button.setAttribute("class", "removeStep");
                            button.setAttribute("data-stepI", recipes[Name].stepCount);
                        }
                        updateButtonEventListener(button);

                        button.setAttribute("value",Name);
                        
                        button.style.backgroundColor = "red";
                        button.textContent = "X";
                        tmpdiv.appendChild(li);
                        tmpdiv.appendChild(button);
                        ul.appendChild(tmpdiv);
                    }
                }
            }
        }
    }
}

recipes = {};

tempRecipe = {
    Name : "",
    ingredient : "",
    step : ""
};
//готовим объект для рецептов
//===============================================================
//создаем интерфейс


//callback для кнопок
const callbacks = {
    addName : function(){
        const Name = tempRecipe.Name;
        if(!recipes.hasOwnProperty(Name) || recipes[Name] === undefined){
            recipes[Name] = new Recipe(Name);
            createRecipeObject(Name);
            console.log("кнопка нажата: рецепт " + Name + " добавлен");
        }
    },

    //будет проверять, не пусто ли поле recipeName, и уже создан ли
    //объект рецепта
    addIngr : function (){
        const Name = tempRecipe.Name;
        if (Name.length !== 0){

        if (recipes.hasOwnProperty(Name) && recipes[Name] !== undefined){

            recipes[Name].addIngredient(tempRecipe.ingredient);
            console.log("кнопка нажата: ингредиент " + tempRecipe.ingredient + " добавлен");
            updateRecipe(Name, "ingredients",tempRecipe.ingredient);
            saveRecipes();
        }
        else {
            
            alert("СНАЧАЛА НУЖНО СОЗДАТЬ РЕЦЕПТ, ПОТОМ МОЖНО ДОБАВИТЬ ИНГРЕДИНЕТЫ");
            
        }
        }
        else {
        alert("УКАЖИТЕ, НА КАКОЙ РЕЦЕПТ ДОБАВИТЬ ИНГРЕДИЕНТ. НЕ ОСТАВЛЯЙ ПОЛЕ НАЗВАНИЯ ПУСТЫМ");
        }
    },
    addStep : function (){
        const Name = tempRecipe.Name;
        if (Name.length !== 0){

        if (recipes.hasOwnProperty(Name) && recipes[Name] !== undefined){

            recipes[tempRecipe.Name].addStep(tempRecipe.step);
            updateRecipe(Name, "prepSteps",tempRecipe.step);
            
            console.log("кнопка нажата: шаг " + tempRecipe.step + " добавлен");
        }
        else {
            
            alert("НЕ ОСТАВЛЯЙ ПОЛЕ ПУСТЫМ");

        }
        }
        else {
        alert("УКАЖИТЕ, НА КАКОЙ РЕЦЕПТ ДОБАВИТЬ ШАГ. НЕ ОСТАВЛЯЙ ПОЛЕ НАЗВАНИЯ ПУСТЫМ");
        }
    },
    remove : function (Name){
        console.log("УДАЛЕНИЕ РЕЦЕПТА: " + Name);
        recipes[Name] = undefined;
        const recdiv = document.getElementById(Name);
        if(recdiv){
            recdiv.parentElement.removeChild(recdiv);
        }
        saveRecipes();
    }
};

var buttons = document.getElementsByTagName("button");

for(const button of buttons){
    button.addEventListener("click", () => {
        var attr = button.getAttribute("id");
        if( attr === "create" ){
            if(tempRecipe.Name.trim().length !== 0){
                tempRecipe.Name = tempRecipe.Name.toUpperCase();
                callbacks.addName();
                saveRecipes();

            }
            else alert("НЕ ОСТАВЛЯЙ ПОЛЕ ПУСТЫМ");
        }
        else if( attr === "addIngr" ){

            if(tempRecipe.ingredient.trim().length !== 0){
                callbacks.addIngr();
                const input = document.getElementById("ingrd");
                if(input){
                    input.value = "";
                }
                saveRecipes();
            }
            else alert("НЕ ОСТАВЛЯЙ ПОЛЕ ПУСТЫМ");
        }
        else if( attr === "addStep" ){

            if(tempRecipe.step.trim().length !== 0){
                callbacks.addStep();
                const input = document.getElementById("prepstep");
                if(input){
                    input.value = "";
                }
                saveRecipes();
            }
            else alert("НЕ ОСТАВЛЯЙ ПОЛЕ ПУСТЫМ");
        }
    }); 
}

//собираем все поля ввода
var inputs = document.getElementsByTagName("input");

//устанавливаем callback для каждого поля
for(const inp of inputs){

    inp.addEventListener("input", function(event){
        const attr = inp.getAttribute("id");
        var value = event.target.value.trim().toLowerCase();
        if(value.includes(",")){

            alert("Можно только добавить один элемент за раз. Избегайте запятые!");
            event.target.value = "";

        }
        else {
            //dropRecipeObject();
            if( attr === "recipeName" ){
                tempRecipe.Name = value;
                console.log("Название рецепта: " + tempRecipe.Name);
            }
            else if (attr === "ingrd" ){
                tempRecipe.ingredient = value;
                console.log("Игредиент: " + tempRecipe.ingredient);
            }
            else if (attr === "prepstep" ){
                tempRecipe.step = value;
                console.log("Шаг приготовления: " + tempRecipe.step);
            }
        }
    });
}


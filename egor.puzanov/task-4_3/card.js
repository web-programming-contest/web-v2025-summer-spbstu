// import {data, PATCH} from "main.js"

function createCard(recepie){
    const div = document.createElement("div");
    div.classList = ["OuterCard"];
    div.id = `card-${recepie.title.replace(" ", "_")}`;
    const image = images[recepie.title]
    //шаблон
    div.innerHTML = `
                <div class="card">
                    <h3>${recepie.title}</h3>
                    ${image ? `<img alt="тут должна быть картинка" src="${image}">` : ""}
                    <p>
                        <label for="add-i-${recepie.title.replace(" ", "_")}" id="label-i-${recepie.title.replace(" ", "_")}">Ингредиенты: ${recepie.ingredientCount} шт.</label>
                        <button class="hiddenButton" id="add-i-${recepie.title.replace(" ", "_")}">
                            <svg class="iconAdd" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </button>
                        <input id="input-i" class="cardInput" placeholder="Введите новый ингредиент" />
                    </p>
                    <ul>
                    </ul>
                    <p>
                        <label for="add-s-${recepie.title.replace(" ", "_")}" id="label-s-${recepie.title.replace(" ", "_")}">Шаги: ${recepie.stepCount} шт.</label>
                        <button class="hiddenButton" id="add-s-${recepie.title.replace(" ", "_")}">
                            <svg class="iconAdd" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </button>
                        <input id="input-s" class="cardInput" placeholder="Введите новый шаг" />
                    </p>
                    <ol>
                    </ol>
                    </div>
                <button class="hiddenButton bottomButton" id="del-r-${recepie.title.replace(" ", "_")}">Удалить Рецепт</button>
            `;
    

    //добавдение ингредиента
    div.querySelector(`#add-i-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        // const ingredient = prompt("Введите новый ингредиент!", undefined);
        const input = div.querySelector("#input-i");
        if(input.classList.contains("add")){
            if(input.value){
                const ul = div.querySelector("ul");
                li = createLi(true, input.value, recepie.title);
                ul.appendChild(li);
                const label = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`);
                const temp = data[recepie.title];
                temp.addIngredient(input.value);

                await PATCHDATA(data);

                const len = SetOfIngredients.size;
                SetOfIngredients.add(input.value);
                if(SetOfIngredients.size != len){
                    const ingredientDiv = document.getElementById("objectOptions");
                    const newObject = document.createElement("button");
                    newObject.classList.add("dropdownBtn");
                    newObject.classList.add("objectBtn");
                    newObject.textContent = ingredient;
                    addListenerIng(newObject);
                    ingredientDiv.appendChild(newObject);
                }


                label.textContent = `Ингредиенты: ${temp.ingredientCount} шт.`
            }
            input.classList.remove("add");
        }
        else{
            input.value = null;
            input.classList.add("add");
        }
    });
    div.querySelector("#input-i").addEventListener("change", async (e) => {
        if(e.currentTarget.value){
            const ul = div.querySelector("ul");
            li = createLi(true, e.currentTarget.value, recepie.title);
            ul.appendChild(li);
            e.currentTarget.classList.remove("add");
            const label = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`);
            const temp = data[recepie.title];
            temp.addIngredient(e.currentTarget.value);
            
            await PATCHDATA(data);
            
            const len = SetOfIngredients.size;
            SetOfIngredients.add(e.currentTarget.value);
            if(SetOfIngredients.size != len){
                const ingredientDiv = document.getElementById("objectOptions");
                const newObject = document.createElement("button");
                newObject.classList.add("dropdownBtn");
                newObject.classList.add("objectBtn");
                newObject.textContent = e.currentTarget.value;
                addListenerIng(newObject);
                ingredientDiv.appendChild(newObject);
            }


            console.log(data);
            label.textContent = `Ингредиенты: ${temp.ingredientCount} шт.`
        }
    });

    //добавдение шага
    div.querySelector(`#add-s-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        // const ingredient = prompt("Введите новый ингредиент!", undefined);
        const input = div.querySelector("#input-s");
        if(input.classList.contains("add")){
            if(input.value){
                const ol = div.querySelector("ol");
                li = createLi(false, input.value, recepie.title);
                ol.appendChild(li);
                const label = div.querySelector(`#label-s-${recepie.title.replace(" ", "_")}`);
                const temp = data[recepie.title];
                temp.addStep(e.currentTarget.value);


                await PATCHDATA(data)


                console.log(data);
                label.textContent = `Шаги: ${temp.stepCount} шт.`
            }
            input.classList.remove("add");
        }
        else{
            input.value = null;
            input.classList.add("add");
        }
    });
    div.querySelector("#input-s").addEventListener("change", async (e) => {
        if(e.currentTarget.value){
            const ol = div.querySelector("ol");
            li = createLi(false, e.currentTarget.value, recepie.title);
            ol.appendChild(li);
            e.currentTarget.classList.remove("add");
            const label = div.querySelector(`#label-s-${recepie.title.replace(" ", "_")}`);
            const temp = data[recepie.title];
            temp.addStep(e.currentTarget.value);


            await PATCHDATA(data)


            console.log(data);
            label.textContent = `Шаги: ${temp.stepCount} шт.`
        }
     })
    

    //Список ингредиентов
    const ul = div.querySelector("ul");
    recepie.ingredients.forEach(ingredient => {
        li = createLi(true, ingredient, recepie.title);
        ul.appendChild(li);
    });

    //Список шагов
    const ol = div.querySelector("ol");
    recepie.steps.forEach(step => {
        li = createLi(false, step, recepie.title);
        ol.appendChild(li);
    });

    //Удалить рецепт
    div.querySelector(`#del-r-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e) => {
            delete data[recepie.title]
            delete images[recepie.title]

            await Promise.all([PATCHDATA(data), PATCHIMAGES(images)]).then(() => {return});

            div.remove();
            GrayScreenMain.classList.toggle("unhidden");
    });

    //обработка
    div.addEventListener("click", (e) => {
        const div = e.currentTarget;
        if(Array.from(div.classList).includes("cardClicked")) {return;}
        const coords = div.getBoundingClientRect();
        const val = ((window.innerWidth/10) - coords.left);
        const val2 = ((window.innerHeight/20) - coords.top);
        div.style.setProperty('--val', `${val-20}px`);
        div.style.setProperty('--val2', `${val2}px`);
        div.classList.add("cardClicked");
        GrayScreenMain.classList.add("unhidden");
        setTimeout(() => {
            const coords = div.getBoundingClientRect();
            const left = (coords.left / window.innerWidth) * 100;
            const top = (coords.top / window.innerHeight) * 100;
            div.style.setProperty('--left', `${left}vw`);
            div.style.setProperty('--top', `${top}vh`);
            div.classList.add("part2");
        }, 800);
        
    })
    return div;
    
    function createLi(flag, value, title){
        li = document.createElement("li");
        li.id = `${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`;
        // li.innerHTML = `<label for="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">${value}</label>
        li.innerHTML = `<p for="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">${value}</p>
        <button class="hiddenButton" id="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">
            <svg class="iconDel" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </button class="hiddenButton">`
        li.querySelector("button").addEventListener("click", async (e) => {
                if(flag){
                    const tempArrayRec = fillterByIngredient(ArrayRecepies, value);
                    if(tempArrayRec.length === 1){
                        const tempArrayIng = div.querySelectorAll(`#del-i-${title.replace(" ", "_")}-${value.replace(" ", "_")}`)
                        if(tempArrayIng.length === 1){
                            SetOfIngredients.delete(value);
                            document.querySelector(`#filterIng-${value.replace(" ", "_")}`).remove();
                        }
                    }
                }
                const temp = data[title];
                flag ? temp.removeIngredient(value) : temp.removeStep(value);
    
                await PATCHDATA(data);
    
    
                console.log(data);
                const label = document.querySelector(`#label-${flag ? "i" : "s"}-${title.replace(" ", "_")}`);
                label.textContent = `${flag ? "Ингредиенты" : "Шаги"}: ${flag ? temp.ingredientCount : temp.stepCount} шт.`
            document.getElementById(`${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`).remove();
        })
        return li;
    }
}

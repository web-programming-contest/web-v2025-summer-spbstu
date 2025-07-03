// import {data, PATCH} from "main.js"

//Все что связанно с карточкой ингредиента

function createCard(recepie){
    const div = document.createElement("div");
    div.classList = ["OuterCard"];
    div.id = `card-${recepie.title.replace(" ", "_")}`;
    const image = Images[recepie.title]
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

    //по кнопке
    div.querySelector(`#add-i-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        // const ingredient = prompt("Введите новый ингредиент!", undefined);
        const input = div.querySelector("#input-i");
        if(input.classList.contains("add")){
            if(input.value){
                const ul = div.querySelector("ul");
                li = createLi(true, input.value, recepie.title);
                ul.appendChild(li);
                const label = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`);
                const temp = DictRecepies[recepie.title];
                temp.addIngredient(input.value);

                await PATCHDATA(DictRecepies);

                const len = SetOfIngredients.size;
                SetOfIngredients.add(input.value);
                if(SetOfIngredients.size != len){ //добавление в выпадающий список
                    const ingredientDiv = document.getElementById("objectOptions");
                    const newObject = document.createElement("button");
                    newObject.classList.add("dropdownBtn");
                    newObject.classList.add("objectBtn");
                    newObject.id=`filterIng-${input.value.replace(" ", "_")}`;
                    newObject.textContent = input.value;
                    addListenerIng(newObject);
                    ingredientDiv.appendChild(newObject);
                }


                label.textContent = `Ингредиенты: ${temp.ingredientCount} шт.`

                rearangeCard(div, recepie, true); //подводка под фильтры

                const filtering = document.getElementById("listObjectBtn").textContent;

                //это условие по идее никогда не выполнится, но на всякий случай
                if(filtering !== "Все ингрeдиенты" && div.style.display === "none"){

                    div.style.display = "block";

                    const currentTable = div.parentElement;
                    
                    if(currentTable.style.display === "none"){
                        const header = document.createElement("h2");
                        header.classList.add("FilterIngr");
                        header.textContent = `Рецепты, содержащие: ${filtering}`;
                        document.querySelector("main").insertBefore(header, currentTable);
                    }
                }
            }
            input.classList.remove("add");
        }
        else{
            input.value = null;
            input.classList.add("add"); //показать ввод если спрятан
        }
    });

    //по нажатии куда-то на экран или tab/enter
    div.querySelector("#input-i").addEventListener("change", async (e) => {
        if(e.currentTarget.value){
            const ul = div.querySelector("ul");
            li = createLi(true, e.currentTarget.value, recepie.title);
            ul.appendChild(li);
            e.currentTarget.classList.remove("add");
            const label = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`);
            const temp = DictRecepies[recepie.title];
            temp.addIngredient(e.currentTarget.value);
            
            await PATCHDATA(DictRecepies);
            
            const len = SetOfIngredients.size;
            SetOfIngredients.add(e.currentTarget.value);
            if(SetOfIngredients.size != len){ //добавление в выпадающий список
                const ingredientDiv = document.getElementById("objectOptions");
                const newObject = document.createElement("button");
                newObject.classList.add("dropdownBtn");
                newObject.classList.add("objectBtn");
                newObject.id=`filterIng-${e.currentTarget.value.replace(" ", "_")}`;
                newObject.textContent = e.currentTarget.value;
                addListenerIng(newObject);
                ingredientDiv.appendChild(newObject);
            }

            label.textContent = `Ингредиенты: ${temp.ingredientCount} шт.`;

            rearangeCard(div, recepie, true);//добавление в выпадающий список

            const filtering = document.getElementById("listObjectBtn").textContent;

            //это условие по идее никогда не выполнится, но на всякий случай
            if(filtering !== "Все ингрeдиенты" && div.style.display === "none"){

                div.style.display = "block";
                const currentTable = div.parentElement;
                
                if(currentTable.style.display === "none"){
                    const header = document.createElement("h2");
                    header.classList.add("FilterIngr");
                    header.textContent = `Рецепты, содержащие: ${filtering}`;
                    document.querySelector("main").insertBefore(header, currentTable);
                }
            }
        }
    });

    //добавдение шага

    //по кнопке
    div.querySelector(`#add-s-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        // const ingredient = prompt("Введите новый ингредиент!", undefined);
        const input = div.querySelector("#input-s");
        if(input.classList.contains("add")){
            if(input.value){
                const ol = div.querySelector("ol");
                li = createLi(false, input.value, recepie.title);
                ol.appendChild(li);
                const label = div.querySelector(`#label-s-${recepie.title.replace(" ", "_")}`);
                const temp = DictRecepies[recepie.title];
                temp.addStep(e.currentTarget.value);


                await PATCHDATA(DictRecepies)


                console.log(DictRecepies);
                label.textContent = `Шаги: ${temp.stepCount} шт.`

                rearangeCard(div, recepie, false); //подгонка под фильры
            }
            input.classList.remove("add");
        }
        else{
            input.value = null;
            input.classList.add("add"); //показать ввод если спрятан
        }
    });

    //по нажатии куда-то на экран или tab/enter
    div.querySelector("#input-s").addEventListener("change", async (e) => {
        if(e.currentTarget.value){
            const ol = div.querySelector("ol");
            li = createLi(false, e.currentTarget.value, recepie.title);
            ol.appendChild(li);
            e.currentTarget.classList.remove("add");
            const label = div.querySelector(`#label-s-${recepie.title.replace(" ", "_")}`);
            const temp = DictRecepies[recepie.title];
            temp.addStep(e.currentTarget.value);


            await PATCHDATA(DictRecepies)


            console.log(DictRecepies);
            label.textContent = `Шаги: ${temp.stepCount} шт.`;

            rearangeCard(div, recepie, false); //подгонка под фильры
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
            
        const currentTable = div.parentElement;
        const ingredients = div.querySelector("ul").children;
        Array.from(ingredients).forEach(li => { //удаление из выпадающего списка
            value = li.querySelector("p").textContent;
            const tempArrayRec = fillterByIngredient(ArrayRecepies, value);
                if(tempArrayRec.length === 1){
                    const tempArrayIng = div.querySelectorAll(`#del-i-${recepie.title.replace(" ", "_")}-${value.replace(" ", "_")}`)
                    if(tempArrayIng.length === 1){ //если вдруг инредиенты на карточки дублируются
                        SetOfIngredients.delete(value);
                        document.querySelector(`#filterIng-${value.replace(" ", "_")}`).remove();
                    }
                }
        })

        //удалить из всех локальных данных
        const index = ArrayRecepies.indexOf(DictRecepies[recepie.title]);
        ArrayRecepies.splice(index, 1);
        delete DictRecepies[recepie.title];
        delete Images[recepie.title];

        await Promise.all([PATCHDATA(DictRecepies), PATCHIMAGES(Images)]).then(() => {return});

        div.remove();

        //проверка пустой ли контейнер
        if(Array.from(currentTable.children).every(el => el.style.display === "none")){
        const possibleHeader = currentTable.previousSibling ;
            if(possibleHeader.tagName === "H2" ){
                if(possibleHeader.previousSibling.tagName  === "H2" ){
                    possibleHeader.previousSibling.remove()
                }
                possibleHeader.remove();
            }
            currentTable.style.display = "none";
        }
        if(currentTable.children.length === 0){
            currentTable.remove();
        }
        GrayScreenMain.classList.toggle("unhidden");
    });

    //обработка когда выбрали карточку
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
    
    //элемент списка ингредиентов/шагов
    function createLi(flag, value, title){
        li = document.createElement("li");
        li.id = `${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`;
        // li.innerHTML = `<label for="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">${value}</label>
        li.innerHTML = `<p for="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">${value}</p>
        <button class="hiddenButton" id="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">
            <svg class="iconDel" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </button class="hiddenButton">`
        li.querySelector("button").addEventListener("click", async (e) => { //кнопка удалить
            if(flag){ //убирает из выпадающего списка
                const tempArrayRec = fillterByIngredient(ArrayRecepies, value);
                if(tempArrayRec.length === 1){
                    const tempArrayIng = div.querySelectorAll(`#del-i-${title.replace(" ", "_")}-${value.replace(" ", "_")}`)
                    if(tempArrayIng.length === 1){ //если дублируется ингредиент
                        SetOfIngredients.delete(value);
                        document.querySelector(`#filterIng-${value.replace(" ", "_")}`).remove();
                    }
                }
                
            }
            const temp = DictRecepies[title];
            flag ? temp.removeIngredient(value) : temp.removeStep(value);
            
            await PATCHDATA(DictRecepies);
            
            const label = document.querySelector(`#label-${flag ? "i" : "s"}-${title.replace(" ", "_")}`);
            label.textContent = `${flag ? "Ингредиенты" : "Шаги"}: ${flag ? temp.ingredientCount : temp.stepCount} шт.`
            rearangeCard(document.querySelector(`#card-${title.replace(" ", "_")}`), DictRecepies[title], flag);
            document.getElementById(`${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`).remove();
        })
        return li;
    }
}

//перемещает карточку в соответствии с группировкой
function rearangeCard(div, recepie, isIngr) {
    const currentTable = div.parentElement;
    const grouping = document.getElementById("listSourceBtn").textContent;
    const filtering = document.getElementById("listObjectBtn").textContent;
    //обработка групп
    if(grouping === `Сгруппировать по кол-ву ${isIngr ? "ингредиентов" :  "шагов"}`) {
            const num = (isIngr ? recepie.ingredientCount : recepie.stepCount);
            const table = document.querySelector(`#forTable-${num}`); //где должно в итоге быть
            if(table){ //если уже такая таблица есть
                table.appendChild(div);
                if(div.style.display !== "none" && table.style.display === "none"){ //если она  спрятана
                    table.style.display = "grid";
                    const header = document.createElement("h2");
                    header.classList.add("groupStep");
                    header.textContent = `Количество ${isIngr ? "ингредиентов" :  "шагов"}: ${num}`;
                    document.querySelector("main").insertBefore(header, table);
                    if(filtering !== "Все ингрeдиенты"){ //дополнительные заголовки если есть второй фильтр
                        const header = document.createElement("h2");
                        header.classList.add("FilterIngr");
                        header.textContent = `Рецепты, содержащие: ${filtering}`;
                        document.querySelector("main").insertBefore(header, table);
                    }
                }
            }
            else{ //если таблицу надо создать
                const table = document.createElement("div");
                table.classList.add("forTable");
                table.id = `forTable-${num}`;
                table.appendChild(div);
                if(div.style.display === "none"){ //если карточка не подходит под второй фильтр
                    table.style.display = "none";
                }
                else{
                    const header = document.createElement("h2");
                    header.classList.add("groupStep");
                    header.textContent = `Количество ${isIngr ? "ингредиентов" :  "шагов"}: ${num}`;
                    document.querySelector("main").insertBefore(header, loader);
                    if(filtering !== "Все ингрeдиенты"){//дополнительные заголовки если есть второй фильтр
                        const header = document.createElement("h2");
                        header.classList.add("FilterIngr");
                        header.textContent = `Рецепты, содержащие: ${filtering}`;
                        document.querySelector("main").insertBefore(header, loader);
                    }
                }
                document.querySelector("main").insertBefore(table, loader);
            }
    }
    
    //чистим контейнер где карточка был до этого
    if(Array.from(currentTable.children).every(el => el.style.display === "none")){
        const possibleHeader = currentTable.previousSibling ;
        if(possibleHeader.tagName === "H2" ){
            if(possibleHeader.previousSibling.tagName  === "H2" ){
                possibleHeader.previousSibling.remove()
            }
            possibleHeader.remove();
        }
        currentTable.style.display = "none";
    }
    if(currentTable.children.length === 0){
        currentTable.remove();
    }
}
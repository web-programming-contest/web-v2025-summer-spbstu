
//все что связано с формой создания рецепта

function createForm(recepie = new Recepie()){
    const div = document.createElement("div");
    div.classList.add("OuterCard");
    div.classList.add("formCreate");
    //шаблон
    div.innerHTML = `
                <div class="card">

                    <input id="input-t" placeholder="Введите название нового рецепта" />
                    <img alt="тут может быть картинка !">
                    <input type="file" id="fileInput" accept="image/png, image/jpeg">
                    <p>
                    <label for="add-i-${recepie.title.replace(" ", "_")}" id="label-i-${recepie.title.replace(" ", "_")}">Ингредиенты: ${recepie.ingredientCount} шт.</label>
                    <button class="hiddenButton" id="add-i-${recepie.title.replace(" ", "_")}">
                    <svg class="iconAdd" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </button>
                    <input id="input-i" class="add formAdd" placeholder="Введите новый рецепт" />
                    </p>
                    <ul>
                    </ul>
                    <p>
                    <label for="add-s-${recepie.title.replace(" ", "_")}" id="label-s-${recepie.title.replace(" ", "_")}">Шаги: ${recepie.stepCount} шт.</label>
                    <button class="hiddenButton" id="add-s-${recepie.title.replace(" ", "_")}">
                    <svg class="iconAdd" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </button>
                    <input id="input-s" class="add formAdd" placeholder="Введите новый шаг" />
                    </p>
                    <ol>
                    </ol>
                    </div>
                <p id="formError"></p>
                <div class="forButtons">
                    <button class="hiddenButton bottomButtonForm delRecButton" id="del-r-${recepie.title.replace(" ", "_")}">Отменить</button>
                    <button class="hiddenButton bottomButtonForm addRecButton" id="add-r-${recepie.title.replace(" ", "_")}">Добавить Рецепт</button>
                </div>
            `;
    //ввод названия
    div.querySelector("#input-t").addEventListener("change", (e) => {
        const titles = Array.from(Object.keys(DictRecepies));
        if(titles.includes(e.target.value)){
            showError("Рецепт с таким названием уже существует!");
            return;
        }
    })

    //добавление картинки
    div.querySelector("#fileInput").addEventListener("change", async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log('File selected:', selectedFile.name);
            imgData = await convertFileToBase64(selectedFile);
            const img = div.querySelector("img");
            img.src = "data:image/png;base64," + imgData;
        }
    })

    //добавдение ингредиента

    //через кнопку
    div.querySelector(`#add-i-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        const input = div.querySelector("#input-i");
        if(input.value){
                const ul = div.querySelector("ul");
                li = createLiForm(true, input.value, recepie.title);
                ul.appendChild(li);
                const label = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`);
                const textSplit = label.textContent.split(" ");
                textSplit[1] = parseInt(textSplit[1])+1;
                label.textContent = textSplit.join(" ");
                input.value = null;
            }
    });

    //нажав где-то на экране или tab/enter
    div.querySelector("#input-i").addEventListener("change", async (e) => {
        if(e.currentTarget.value){
            const ul = div.querySelector("ul");
            li = createLiForm(true, e.currentTarget.value, recepie.title);
            ul.appendChild(li);
            e.currentTarget.value = null;
            const label = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`);


            const textSplit = label.textContent.split(" ");
            textSplit[1] = parseInt(textSplit[1])+1;
            label.textContent = textSplit.join(" ");
        }
    });

    //добавдение шага

    //через кнопку
    div.querySelector(`#add-s-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        const input = div.querySelector("#input-s");
        if(input.value){
                const ol = div.querySelector("ol");
                li = createLiForm(false, input.value, recepie.title);
                ol.appendChild(li);
                const label = div.querySelector(`#label-s-${recepie.title.replace(" ", "_")}`);
                const textSplit = label.textContent.split(" ");
                textSplit[1] = parseInt(textSplit[1])+1;
                label.textContent = textSplit.join(" ");
                input.value = null;
            }
    });

    //нажав где-то на экране или tab/enter
    div.querySelector("#input-s").addEventListener("change", async (e) => {
        if(e.currentTarget.value){
            const ol = div.querySelector("ol");
            li = createLiForm(false, e.currentTarget.value, recepie.title);
            ol.appendChild(li);
            e.currentTarget.value = null;
            const label = div.querySelector(`#label-s-${recepie.title.replace(" ", "_")}`);


            const textSplit = label.textContent.split(" ");
            textSplit[1] = parseInt(textSplit[1])+1;
            label.textContent = textSplit.join(" ");
        }
     })
    

    //Список ингридиентов
    const ul = div.querySelector("ul");
    recepie.ingredients.forEach(ingredient => {
        li = createLiForm(true, ingredient, recepie.title);
        ul.appendChild(li);
    });

    //Список шагов
    const ol = div.querySelector("ol");
    recepie.steps.forEach(step => {
        li = createLiForm(false, step, recepie.title);
        ol.appendChild(li);
    });

    //Удалить рецепт
    div.querySelector(`#del-r-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e) => {

            div.remove();
            GrayScreen2.classList.toggle("unhidden");
    });

    //добавить рецепт
    div.querySelector(".addRecButton").addEventListener("click", (e) => {
        //проверка на название
        const titles = Array.from(Object.keys(DictRecepies));
        const title = div.querySelector("#input-t").value;
        if(!title){
            showError("Введите название");
            div.querySelector("#input-t").focus();
            return;
        }
        if(titles.includes(title)){
            showError("Рецепт с таким названием уже существует!");
            div.querySelector("#input-t").focus();
            return;
        }

        //есть хотя бы один ингредиент
        const ingrNum = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`).textContent.split(" ")[1];
        if(ingrNum === '0'){
            showError("Введите хотя бы один ингредиент!");
            div.querySelector("#input-i").focus();
            return;
        }
        //есть хотя бы один шаг
        const stepNum = div.querySelector(`#label-s-${recepie.title.replace(" ", "_")}`).textContent.split(" ")[1];
        if(stepNum === '0'){
            showError("Введите хотя бы один шаг!");
            div.querySelector("#input-s").focus();
            return;
        }

        const ingredients = [];
        Array.from(div.querySelector("ul").children).forEach(li => {
            ingredients.push(li.querySelector("p").textContent);
        });
        const steps = [];
        Array.from(div.querySelector("ol").children).forEach(li => {
            steps.push(li.querySelector("p").textContent);
        });

        // переделка в класс
        const newRecepie = new Recepie(title, ingredients, steps);
        ArrayRecepies.push(newRecepie);
        ingredients.forEach(ingredient => {
            const len = SetOfIngredients.size;
            SetOfIngredients.add(ingredient);
            if(SetOfIngredients.size != len){
                const ingredientDiv = document.getElementById("objectOptions");
                const newObject = document.createElement("button");
                newObject.classList.add("dropdownBtn");
                newObject.classList.add("objectBtn");
                newObject.id=`filterIng-${ingredient.replace(" ", "_")}`;
                newObject.textContent = ingredient;
                addListenerIng(newObject);
                ingredientDiv.appendChild(newObject);
            }
        });
        const image = div.querySelector("img").src;

        ////разборки с картинкой
        // const sep = image[Math.floor(image.length/2)]
        // const temp = image.split(sep);
        // temp[0] = temp[0]  + sep

        // console.log(temp);

        // localStorage.setItem(`${title}-1`, temp[0])
        // localStorage.setItem(`${title}-2`, temp[1])


        POSTRECEPIE(newRecepie);
        POSTIMAGE(image, title);
        
        div.classList = ["OuterCard"];

        AddCard(createCard(newRecepie), newRecepie);
        showNotification("Новый рецепт добавлен!");
        div.remove()
        GrayScreen2.classList.toggle("unhidden");

    })

    return div;

    //поквзывает что не так
    function showError(message){
        const formError = div.querySelector("#formError");
        formError.classList.add("display");
        formError.textContent = message;
        setTimeout(() => formError.classList.remove("display"), 2000)
    }
}

//элемент добавления шага/ингредиента
function createLiForm(flag, value, title){
    li = document.createElement("li");
    li.id = `${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`;
    li.innerHTML = `<p for="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">${value}</p>
    <button class="hiddenButton" id="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">
        <svg class="iconDel" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </button class="hiddenButton">`
    li.querySelector("button").addEventListener("click", async (e) => { //кнопка удалить
        const label = document.querySelector(`#label-${flag ? "i" : "s"}-${title.replace(" ", "_")}`);
        const textSplit = label.textContent.split(" ");
        textSplit[1] = parseInt(textSplit[1])-1;
        label.textContent = textSplit.join(" ");
        document.getElementById(`${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`).remove();
    })
    return li;
}

//переделка картинки в строку (откуда-то взято)
async function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("loadend", (e) => {

            const base64 = reader.result.split(',')[1];
            resolve(base64);
        });
        reader.addEventListener("onerror", (e) => {
            reject;
        })
        reader.readAsDataURL(file);
    }).then((str) => {return str});
}

//добавление новой карточки с учетом всех фильтров
function AddCard(card, recepie){
    const grouping = document.getElementById("listSourceBtn").textContent;
    const filtering = document.getElementById("listObjectBtn").textContent;
    const loader = document.getElementById("loader");
    if(filtering !== "Все ингрeдиенты"){
        const ingredients = card.querySelector("ul").children;
        if(Array.from(ingredients).every(li => li.id !== `i-${recepie.title.replace(" ", "_")}-${filtering.replace(" ", "_")}`)){
            card.style.display = "none";
        }
    }
    if(grouping !== "Без группировки") {
        switch (grouping){
                case "Сгруппировать по кол-ву ингредиентов": {
                    const num = recepie.ingredientCount;
                    const table = document.querySelector(`#forTable-${num}`);
                    if(table){
                        table.appendChild(card);
                        if(card.style.display !== "none" && table.style.display === "none"){
                            table.style.display = "grid";
                            const header = document.createElement("h2");
                            header.classList.add("groupStep");
                            header.textContent = `Количество ингредиентов: ${num}`;
                            document.querySelector("main").insertBefore(header, table);
                            if(filtering !== "Все ингрeдиенты"){
                                const header = document.createElement("h2");
                                header.classList.add("FilterIngr");
                                header.textContent = `Рецепты, содержащие: ${filtering}`;
                                document.querySelector("main").insertBefore(header, table);
                            }
                        }
                    }
                    else{
                        const table = document.createElement("div");
                        table.classList.add("forTable");
                        table.id = `forTable-${num}`;
                        table.appendChild(card);
                        if(card.style.display === "none"){
                            table.style.display = "none";
                        }
                        else{
                            const header = document.createElement("h2");
                            header.classList.add("groupStep");
                            header.textContent = `Количество ингредиентов: ${num}`;
                            document.querySelector("main").insertBefore(header, loader);
                            if(filtering !== "Все ингрeдиенты"){
                                const header = document.createElement("h2");
                                header.classList.add("FilterIngr");
                                header.textContent = `Рецепты, содержащие: ${filtering}`;
                                document.querySelector("main").insertBefore(header, loader);
                            }
                        }
                        document.querySelector("main").insertBefore(table, loader);

                    }
                    return;
                }

                case "Сгруппировать по кол-ву шагов": {
                    const num = recepie.stepCount;
                    const table = document.querySelector(`#forTable-${num}`);
                    if(table){
                        table.appendChild(card);
                        if(card.style.display !== "none" && table.style.display === "none"){
                            table.style.display = "grid";
                            const header = document.createElement("h2");
                            header.classList.add("groupStep");
                            header.textContent = `Количество шагов: ${num}`;
                            document.querySelector("main").insertBefore(header, table);
                            if(filtering !== "Все ингрeдиенты"){
                                const header = document.createElement("h2");
                                header.classList.add("FilterIngr");
                                header.textContent = `Рецепты, содержащие: ${filtering}`;
                                document.querySelector("main").insertBefore(header, table);
                            }
                        }
                    }
                    else{
                        const table = document.createElement("div");
                        table.classList.add("forTable");
                        table.id = `forTable-${num}`;
                        table.appendChild(card);
                        if(card.style.display === "none"){
                            table.style.display = "none";
                        }
                        else{
                            const header = document.createElement("h2");
                            header.classList.add("groupStep");
                            header.textContent = `Количество шагов: ${num}`;
                            document.querySelector("main").insertBefore(header, loader);
                            if(filtering !== "Все ингрeдиенты"){
                                const header = document.createElement("h2");
                                header.classList.add("FilterIngr");
                                header.textContent = `Рецепты, содержащие: ${filtering}`;
                                document.querySelector("main").insertBefore(header, loader);
                            }
                        }
                        document.querySelector("main").insertBefore(table, loader);

                    }
                    return;
                }
                default: {
                    throw new Error("что-то пошло не так");
                }
        }
    }
    else{
        document.querySelector(".forTable").appendChild(card);
    }

    // grid.appendChild(card);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '40px';
    notification.style.right = '30px';
    notification.style.padding = '10px 20px';
    notification.style.background = type === 'success' ? '#4CAF50' : '#f44336';
    notification.style.color = 'white';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.textContent = message;
   
    const existing = document.querySelector('.ag-grid-notification');
    if (existing) existing.remove();
   
    notification.classList.add('ag-grid-notification');
    document.body.appendChild(notification);
   
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}
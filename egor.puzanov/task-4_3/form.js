function createForm(recepie = new Recepie()){
    const div = document.createElement("div");
    div.classList.add("OuterCard");
    div.classList.add("formCreate");
    // const src = 
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

    div.querySelector("#input-t").addEventListener("change", (e) => {
        const titles = Array.from(Object.keys(data));
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
            // console.log(div.querySelector("img"));
            const img = div.querySelector("img");
            img.src = "data:image/png;base64," + imgData;
            // console.log(selectedFile);
            // console.log(selectedFile.height, selectedFile.width)
        }
    })

    //добавдение ингредиента
    div.querySelector(`#add-i-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        // const ingredient = prompt("Введите новый ингридиент!", undefined);
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
    div.querySelector("#input-i").addEventListener("change", async (e) => {
        if(e.currentTarget.value){
            const ul = div.querySelector("ul");
            li = createLiForm(true, e.currentTarget.value, recepie.title);
            ul.appendChild(li);
            // e.currentTarget.classList.remove("add");
            e.currentTarget.value = null;
            const label = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`);


            const textSplit = label.textContent.split(" ");
            textSplit[1] = parseInt(textSplit[1])+1;
            label.textContent = textSplit.join(" ");
        }
    });

    //добавдение шага
    div.querySelector(`#add-s-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        // const ingredient = prompt("Введите новый ингридиент!", undefined);
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
    div.querySelector("#input-s").addEventListener("change", async (e) => {
        if(e.currentTarget.value){
            const ol = div.querySelector("ol");
            li = createLiForm(false, e.currentTarget.value, recepie.title);
            ol.appendChild(li);
            // e.currentTarget.classList.remove("add");
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

    div.querySelector(".addRecButton").addEventListener("click", (e) => {
        //проверка на название
        const titles = Array.from(Object.keys(data));
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

        const ingrNum = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`).textContent.split(" ")[1];
        if(ingrNum === '0'){
            showError("Введите хотя бы один ингредиент!");
            div.querySelector("#input-i").focus();
            return;
        }
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
                newObject.textContent = ingredient;
                addListenerIng(newObject);
                ingredientDiv.appendChild(newObject);
            }
        });
        const image = div.querySelector("img").src;

        // const sep = image[Math.floor(image.length/2)]
        // const temp = image.split(sep);
        // temp[0] = temp[0]  + sep

        // console.log(temp);

        // localStorage.setItem(`${title}-1`, temp[0])
        // localStorage.setItem(`${title}-2`, temp[1])


        POSTRECEPIE(newRecepie);
        POSTIMAGE(image, title);
        
        div.classList = ["OuterCard"];
        // setTimeout(()=> {
        //     div.remove()
        //     AddCard(createCard(newRecepie));
        // }, 700)
        AddCard(createCard(newRecepie));
        div.remove()
        GrayScreen2.classList.toggle("unhidden");
        // console.log(ingredients);

    })

    return div;

    function showError(message){
        const formError = div.querySelector("#formError");
        formError.classList.add("display");
        formError.textContent = message;
        setTimeout(() => formError.classList.remove("display"), 2000)
    }
}

function createLiForm(flag, value, title){
    li = document.createElement("li");
    li.id = `${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`;
    //li.innerHTML = `<label for="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">${value}</label>
    li.innerHTML = `<p for="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">${value}</p>
    <button class="hiddenButton" id="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">
        <svg class="iconDel" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </button class="hiddenButton">`
    li.querySelector("button").addEventListener("click", async (e) => {
        const label = document.querySelector(`#label-${flag ? "i" : "s"}-${title.replace(" ", "_")}`);
        const textSplit = label.textContent.split(" ");
        textSplit[1] = parseInt(textSplit[1])-1;
        label.textContent = textSplit.join(" ");
        document.getElementById(`${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`).remove();
    })
    return li;
}


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
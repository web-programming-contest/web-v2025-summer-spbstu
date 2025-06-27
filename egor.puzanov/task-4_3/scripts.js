
const GrayScreen = document.getElementById("GrayScreen");
const loader = document.getElementById("loader")
let data = {};

document.addEventListener("DOMContentLoaded", async (e) => {
    localStorage.setItem("data", JSON.stringify({"рецепт 3": new Recipie("рецепт 3", ['ингредиент 1', 'ингредиент 4', 'ингредиент 3'], ['шаг 1', 'шаг 2', 'шаг 3'])}))
    const getData = new Promise((resolve) => {
        setTimeout(() => {resolve(JSON.parse(localStorage.getItem("data")))}, 3000)
    })

    const recepies = await getData.then((data) => {return data})
    loader.style.opacity = 0;
    setTimeout(() => loader.remove(), 1300);

    const grid = document.getElementById("forTable")
    console.log(recepies)
    Array.from(Object.keys(recepies)).forEach(key =>{
        const recepie = new Recipie(key, recepies[key].ingredients, recepies[key].steps)
        data[key] = recepie;
        grid.appendChild(createCard(recepie))
    })
    

    //Затемнение при выборе карточки
    GrayScreen.addEventListener("click", (e) => {
        cardClicked = document.getElementsByClassName("cardClicked")[0];
        cardClicked.classList = ["OuterCard"];
        GrayScreen.classList.toggle("unhidden");
    });

    const collection = Array.from(document.getElementsByClassName("OuterCard"));
    collection.forEach(el => el.addEventListener("click", (e) => {
        const div = e.currentTarget;
        if(Array.from(div.classList).includes("cardClicked")) {return;}
        const coords = div.getBoundingClientRect();
        const val = ((window.innerWidth/10) - coords.left);
        const val2 = ((window.innerHeight/20) - coords.top);
        div.style.setProperty('--val', `${val-20}px`);
        div.style.setProperty('--val2', `${val2}px`);
        div.classList.add("cardClicked");
        GrayScreen.classList.add("unhidden");
        setTimeout(() => {
            const coords = div.getBoundingClientRect();
            const left = (coords.left / window.innerWidth) * 100;
            const top = (coords.top / window.innerHeight) * 100;
            div.style.setProperty('--left', `${left}vw`);
            div.style.setProperty('--top', `${top}vh`);
            div.classList.add("part2");
        }, 800);
        
    }, ));
})

function createCard(recepie){
    const div = document.createElement("div");
    div.classList = ["OuterCard"];
    //шаблон
    div.innerHTML = `
                <div class="card" id="1">
                    <h3>${recepie.title}</h3>
                    <img alt="тут должна быть картинка" src="">
                    <p>
                        <label for="add-i-${recepie.title.replace(" ", "_")}" id="label-i-${recepie.title.replace(" ", "_")}">Ингредиенты: ${recepie.ingredientCount} шт.</label>
                        <button class="hiddenButton" id="add-i-${recepie.title.replace(" ", "_")}">
                            <svg class="iconAdd" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </button>
                        <input id="input-i" placeholder="Введите новый рецепт" />
                    </p>
                    <ul>
                    </ul>
                    <p>
                        <label for="add-s-${recepie.title.replace(" ", "_")}" id="label-s-${recepie.title.replace(" ", "_")}">Шаги: ${recepie.stepCount} шт.</label>
                        <button class="hiddenButton" id="add-s-${recepie.title.replace(" ", "_")}">
                            <svg class="iconAdd" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </button>
                        <input id="input-s" placeholder="Введите новый шаг" />
                    </p>
                    <ol>
                    </ol>
                    <button class="hiddenButton bottomButton" id="del-r-${recepie.title.replace(" ", "_")}">Удалить Рецепт</button>
                </div>
            `;
    

    //добавдение ингредиента
    div.querySelector(`#add-i-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        // const ingredient = prompt("Введите новый ингридиент!", undefined);
        const input = div.querySelector("#input-i");
        if(input.classList.contains("add")){
            if(input.value){
                const ul = div.querySelector("ul");
                li = createLi(true, input.value, recepie.title);
                ul.appendChild(li);
                const label = div.querySelector(`#label-i-${recepie.title.replace(" ", "_")}`);
                const textSplit = label.textContent.split(" ");
                const temp = data[recepie.title];
                temp.addIngredient(input.value);

                await POST(data)


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
            
            await POST(data)

            console.log(data);
            label.textContent = `Ингредиенты: ${temp.ingredientCount} шт.`
        }
    });

    //добавдение шага
    div.querySelector(`#add-s-${recepie.title.replace(" ", "_")}`).addEventListener("click", async (e)=>{
        // const ingredient = prompt("Введите новый ингридиент!", undefined);
        const input = div.querySelector("#input-s");
        if(input.classList.contains("add")){
            if(input.value){
                const ol = div.querySelector("ol");
                li = createLi(false, input.value, recepie.title);
                ol.appendChild(li);
                const label = div.querySelector(`#label-s-${recepie.title.replace(" ", "_")}`);
                const temp = data[recepie.title];
                temp.addStep(e.currentTarget.value);


                await POST(data)


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


            await POST(data)


            console.log(data);
            label.textContent = `Шаги: ${temp.stepCount} шт.`
        }
     })
    

    //Список ингридиентов
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

            await POST(data);

            div.remove();
            GrayScreen.classList.toggle("unhidden");
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
        GrayScreen.classList.add("unhidden");
        setTimeout(() => {
            const coords = div.getBoundingClientRect();
            const left = (coords.left / window.innerWidth) * 100;
            const top = (coords.top / window.innerHeight) * 100;
            div.style.setProperty('--left', `${left}vw`);
            div.style.setProperty('--top', `${top}vh`);
            div.classList.add("part2");
        }, 800);
        
    }, )
    return div;
}

function createLi(flag, value, title){
    li = document.createElement("li");
    li.id = `${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`;
    li.innerHTML = `<label for="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">${value}</label>
    <button class="hiddenButton" id="del-${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </button class="hiddenButton">`
    li.querySelector("button").addEventListener("click", async (e) => {
            const temp = data[title];
            flag ? temp.removeIngredient(value) : temp.removeStep(value);

            await POST(data)

            console.log(data);
            const label = document.querySelector(`#label-${flag ? "i" : "s"}-${title.replace(" ", "_")}`);
            label.textContent = `${flag ? "Ингредиенты" : "Шаги"}: ${temp.ingredientCount} шт.`
        document.getElementById(`${flag ? "i" : "s"}-${title.replace(" ", "_")}-${value.replace(" ", "_")}`).remove();
    })
    return li;
}

async function POST(data) {
    await new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('data', JSON.stringify(data)), 1000))).then( () => {return} );
    return
}

// `
//                 <div class="card" id="1">
//                     <h3>test1</h3>
//                     <img alt="тут должна быть картинка">
//                     <p>Ингредиенты: 6шт</p>
//                     <ul>
//                         <li>aaaaaaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaaaa</li>
//                         <li>b</li>
//                         <li>c</li>
//                     </ul>
//                     <p>Шаги: 6шт</p>
//                     <ol>
//                         <li>aaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaa</li>
//                         <li>b</li>
//                         <li>c</li>
//                         <li>aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaa</li>
//                         <li>b</li>
//                         <li>c</li>
//                         <li>aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaa</li>
//                         <li>b</li>
//                         <li>c</li>
//                                             <li>aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
//                         <li>b</li>
//                         <li>c</li>
//                         <li>aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
//                         <li>b</li>
//                         <li>c</li>
//                         <li>aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
//                         <li>b</li>
//                         <li>c</li>
//                     </ol>
//                 </div>
// `
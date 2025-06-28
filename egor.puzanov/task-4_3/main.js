
const GrayScreenMain = document.getElementById("GrayScreen1");
const loader = document.getElementById("loader")
let data = {};
let images = {};
const ArrayRecepies = [];
let SetOfIngredients = [];

document.getElementById("addRecepie").style.opacity = 0;
GrayScreenMain.addEventListener("click", (e) => {
    cardClicked = document.getElementsByClassName("cardClicked")[0];
    cardClicked.querySelectorAll(".cardInput.add").forEach(input => input.classList.remove("add")); 
    cardClicked.classList = ["OuterCard"];
    GrayScreenMain.classList.toggle("unhidden");
});

document.addEventListener("DOMContentLoaded", async (e) => {
    // localStorage.clear();
    // localStorage.setItem("data", JSON.stringify({"рецепт 3": new Recepie("рецепт 3", ['ингредиент 1', 'ингредиент 4', 'ингредиент 3'], ['шаг 1', 'шаг 2', 'шаг 3'])}))
    // localStorage.setItem("images", JSON.stringify({"рецепт 3": ""}));

    const answer = await Promise.all([GETRECEPIES(),GETIMAGES()]).then((data) => {return data})
    // data = answer[0];
    images = answer[1];
    // console.log(images);
    loader.style.opacity = 0;
    document.getElementById("addRecepie").style.opacity = 1;
    // setTimeout(() => loader.remove(), 1300);
    
    const grid = document.getElementById("forTable1");
    Array.from(Object.keys(answer[0])).forEach(key =>{
        const recepie = new Recepie(key, answer[0][key].ingredients, answer[0][key].steps)
        ArrayRecepies.push(recepie);
        data[key] = recepie;
        grid.appendChild(createCard(recepie));
    })
    console.log(data);
    

    //Затемнение при выборе карточки

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
        GrayScreenMain.classList.add("unhidden");
        setTimeout(() => {
            const coords = div.getBoundingClientRect();
            const left = (coords.left / window.innerWidth) * 100;
            const top = (coords.top / window.innerHeight) * 100;
            div.style.setProperty('--left', `${left}vw`);
            div.style.setProperty('--top', `${top}vh`);
            div.classList.add("part2");
        }, 800);
        
    }));

    const ingredientDiv = document.getElementById("objectOptions");
    const ingredientsSet = getIngredientSet(ArrayRecepies);
    SetOfIngredients = ingredientsSet;

    //выбор по ингредиентам
    ingredientsSet.forEach(ingredient => {
        const newObject = document.createElement("button");
        newObject.classList.add("dropdownBtn");
        newObject.classList.add("objectBtn");
        newObject.id=`filterIng-${ingredient.replace(" ", "_")}`;
        newObject.textContent = ingredient;
        addListenerIng(newObject);
        ingredientDiv.appendChild(newObject);
    });

    document.querySelector(".objectBtn.specialBtn").addEventListener("click", (e) => {
        const headers = document.querySelectorAll(".FilterIngr");
        Array.from(headers).forEach(div => {
            div.remove();
        })
        const ingredient = e.currentTarget.textContent;
        document.getElementById("listObjectBtn").textContent = ingredient;
        const cards = document.querySelectorAll(".OuterCard");

        cards.forEach(card => card.style.display = "block");

        const tabels = document.querySelectorAll(".forTable");
        Array.from(tabels).forEach(table => {
            if(table.style.display === "none" && Array.from(table.children).some(card => card.style.display !== "none")){
                table.style.display = 'grid';
                const groupFilt =  document.querySelector("#listSourceBtn").textContent;
                if(groupFilt === "Сгруппировать по кол-ву ингредиентов"){
                    const num = table.id.split("-")[1];
                    const header = document.createElement("h2");
                    header.classList.add("groupStep");
                    header.textContent = `Количество ингредиентов: ${num}`;
                    document.querySelector("main").insertBefore(header, table);
                }
                else if (groupFilt === "Сгруппировать по кол-ву шагов"){
                    const num = table.id.split("-")[1];
                    const header = document.createElement("h2");
                    header.classList.add("groupStep");
                    header.textContent = `Количество шагов: ${num}`;
                    document.querySelector("main").insertBefore(header, table);
                }
            }
        })

    });


    const dropDowns = Array.from(document.getElementsByClassName("dropdown"));

    //выбор по кол-ву шагов
    for (let i = 0; i < dropDowns.length; ++i) {
        dropDowns[i].addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = dropDowns[i].children[0].style.display === 'flex';
            dropDowns[i].children[0].style.display = isOpen ? 'none' : 'flex';
        });

        dropDowns[i].addEventListener('mouseleave', function() {
            setTimeout(() => {
            if (!dropDowns[i].children[0].matches(':hover')) {
                dropDowns[i].children[0].style.display = 'none';
            }
        }, 200);
    });
}

let groups = Array.from(document.getElementsByClassName("sourceBtn"));

for(let i = 0; i  < groups.length; ++i) {
    groups[i].addEventListener('click', (e) => {
            const grouping =  e.currentTarget.textContent;
            document.getElementById("listSourceBtn").textContent = grouping ;
            const headers = document.querySelectorAll("h2");
            Array.from(headers).forEach(div => {
                div.remove();
            })
            switch (grouping) {
                case "Без группировки": {
                    const grids = document.querySelectorAll(".forTable");
                    for(let i = grids.length - 1; i > 0; --i){
                        Array.from(grids[i].children).forEach(child => {
                            grids[0].appendChild(child);
                            // console.log(child);
                        })
                        grids[i].remove();
                    }
                    const ingrFiltr = document.querySelector("#listObjectBtn").textContent;
                    if(ingrFiltr !== "Все ингрeдиенты"){
                        const header = document.createElement("h2");
                        header.classList.add("FilterIngr");
                        header.textContent = `Рецепты, содержащие: ${ingrFiltr}`;
                        document.querySelector("main").app
                        // document.querySelector("main").insertBefore(header, loader);
                        document.querySelector("main").prepend(header)
                    }
                    grids[0].style.display = 'grid';
                    return;

                }
                case "Сгруппировать по кол-ву ингредиентов": {
                    const groups = groupByIngredientsLen(ArrayRecepies);
                    Array.from(Object.keys(groups)).forEach(key => {
                        const forTable = document.createElement("div");
                        forTable.id = `forTable-${key}`;
                        forTable.classList.add("forTable");
                        groups[key].forEach(recepie => {
                            forTable.appendChild(document.getElementById(`card-${recepie.title.replace(" ", "_")}`))
                        });

                        if(Array.from(forTable.children).every(el => el.style.display === "none")){
                            forTable.style.display = 'none';
                        }
                        else{
                            const header = document.createElement("h2");
                            header.classList.add("groupStep");
                            header.textContent = `Количество ингредиентов: ${key}`;
                            document.querySelector("main").insertBefore(header, loader);
                            const ingrFiltr = document.querySelector("#listObjectBtn").textContent;
                            if(ingrFiltr !== "Все ингрeдиенты"){
                                const header = document.createElement("h2");
                                header.classList.add("FilterIngr");
                                header.textContent = `Рецепты, содержащие: ${ingrFiltr}`;
                                document.querySelector("main").insertBefore(header, loader);
                            }
                        }
                        document.querySelector("main").insertBefore(forTable, loader);
                    });
                    const grids = document.querySelectorAll(".forTable");
                    Array.from(grids).forEach(div => {
                        if(div.children.length === 0) {div.remove();}
                    })
                    return;
                }

                case "Сгруппировать по кол-ву шагов": {
                    const groups = groupByStepsLen(ArrayRecepies);
                    Array.from(Object.keys(groups)).forEach(key => {
                        const forTable = document.createElement("div");
                        forTable.id = `forTable-${key}`;
                        forTable.classList.add("forTable");
                        groups[key].forEach(recepie => {
                            forTable.appendChild(document.getElementById(`card-${recepie.title.replace(" ", "_")}`))
                        });

                        if(Array.from(forTable.children).every(el => el.style.display === "none")){
                            forTable.style.display = 'none';
                        }
                        else{
                            const header = document.createElement("h2");
                            header.classList.add("groupStep");
                            header.textContent = `Количество шагов: ${key}`;
                            document.querySelector("main").insertBefore(header, loader);
                            const ingrFiltr = document.querySelector("#listObjectBtn").textContent;
                            if(ingrFiltr !== "Все ингрeдиенты"){
                                const header = document.createElement("h2");
                                header.classList.add("FilterIngr");
                                header.textContent = `Рецепты, содержащие: ${ingrFiltr}`;
                                document.querySelector("main").insertBefore(header, loader);
                            }
                        }
                        document.querySelector("main").insertBefore(forTable, loader);
                    });
                    const grids = document.querySelectorAll(".forTable");
                    Array.from(grids).forEach(div => {
                        if(div.children.length === 0) {div.remove();}
                    })
                    return;
                }
            }
        });
    }

})
function addListenerIng(div){
        div.addEventListener("click", (e) => {
            const headers = document.querySelectorAll("h2");
            Array.from(headers).forEach(header => {
                header.remove();
            })

            const ingredient = e.currentTarget.textContent;
            document.getElementById("listObjectBtn").textContent = ingredient;

            const filtered = fillterByIngredient(ArrayRecepies, ingredient);
            const cards = document.querySelectorAll(".OuterCard");

            cards.forEach(card => {
                if(filtered.some(recepie => card.id === `card-${recepie.title.replace(" ", "_")}`)){
                    card.style.display = "block";
                }
                else{
                    card.style.display = "none";
                }
            });
            
            const grids = document.querySelectorAll(".forTable");
            Array.from(grids).forEach(table => {
                if(Array.from(table.children).every(el => el.style.display === "none")){
                    table.style.display = 'none';
                }
                else{
                    table.style.display = 'grid';
                    const groupFilt =  document.querySelector("#listSourceBtn").textContent;
                    if(groupFilt === "Сгруппировать по кол-ву ингредиентов"){
                        const num = table.id.split("-")[1];
                        const header = document.createElement("h2");
                        header.classList.add("groupStep");
                        header.textContent = `Количество ингредиентов: ${num}`;
                        document.querySelector("main").insertBefore(header, table);
                    }
                    else if (groupFilt === "Сгруппировать по кол-ву шагов"){
                        const num = table.id.split("-")[1];
                        const header = document.createElement("h2");
                        header.classList.add("groupStep");
                        header.textContent = `Количество шагов: ${num}`;
                        document.querySelector("main").insertBefore(header, table);
                    }
                    const header = document.createElement("h2");
                    header.classList.add("FilterIngr");
                    header.textContent = `Рецепты, содержащие: ${ingredient}`;
                    document.querySelector("main").insertBefore(header, table);
                }
            });
        })
    }

document.getElementById("addRecepie").addEventListener("click", (e) => {
    const div = createForm();
    addForm(div);
})

function addForm(div){
    const grid = document.getElementById("forTable1");
    grid.appendChild(div);
    const GrayScreen2 = document.getElementById("GrayScreen2")
    const coords = div.getBoundingClientRect();
    const val = ((window.innerWidth/10) - coords.left);
    const val2 = ((window.innerHeight/20) - coords.top);
    div.style.setProperty('--val', `${val-20}px`);
    div.style.setProperty('--val2', `${val2}px`);
    div.classList.add("cardClicked");
    GrayScreen2.classList.add("unhidden");
    setTimeout(() => {
        const coords = div.getBoundingClientRect();
        const left = (coords.left / window.innerWidth) * 100;
        const top = (coords.top / window.innerHeight) * 100;
        div.style.setProperty('--left', `${left}vw`);
        div.style.setProperty('--top', `${top}vh`);
        div.classList.add("part2");
    }, 800);
}

function AddCard(card){
    const grid = document.getElementById("forTable1");
    grid.appendChild(card);
}

function GETRECEPIES() {
    const getData = new Promise((resolve) => {
            setTimeout(() => {resolve(JSON.parse(localStorage.getItem("data")))}, 3000)
        });
    // return  await getData.then((data) => {return data});
    return getData;
}

function GETIMAGES() {
    const getImages = new Promise((resolve) => {
            setTimeout(() => {resolve(JSON.parse(localStorage.getItem("images")))}, 3000)
        });
    // return  await getImages.then((data) => {return data});
    return getImages;
}

function PATCHDATA(data) {
    return new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('data', JSON.stringify(data)), 1000)));
}

function PATCHIMAGES(images) {
    return new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('images', JSON.stringify(images)), 1000)));
  
}


async function POSTRECEPIE(recepie) {
    data[recepie.title] = recepie;
    await new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('data', JSON.stringify(data)), 1000))).then( () => {return} );
    return
}
async function POSTIMAGE(image, title) {
    try {
        images[title] = image;
        await new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('images', JSON.stringify(images)), 1000))).then( () => {return} );
    }
    catch (err){
        images[title] = "";
        await new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('images', JSON.stringify(images)), 1000))).then( () => {return} );
    }
    return
}

// export { data, PATCH, POST }
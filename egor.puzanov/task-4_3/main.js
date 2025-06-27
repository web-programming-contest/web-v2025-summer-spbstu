
const GrayScreenMain = document.getElementById("GrayScreen1");
const loader = document.getElementById("loader")
let data = {};
let images = {};
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
    console.log(images);
    loader.style.opacity = 0;
    document.getElementById("addRecepie").style.opacity = 1;
    setTimeout(() => loader.remove(), 1300);
    
    const grid = document.getElementById("forTable1");
    Array.from(Object.keys(answer[0])).forEach(key =>{
        const recepie = new Recepie(key, answer[0][key].ingredients, answer[0][key].steps)
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
        
    }, ));
})

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
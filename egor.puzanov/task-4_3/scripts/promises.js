//типо сервер


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
//передается весь массив
function PATCHDATA(data) {
    return new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('data', JSON.stringify(data)), 1000)));
}

function PATCHIMAGES(images) {
    return new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('images', JSON.stringify(images)), 1000)));
  
}

//передается один эл-нт
async function POSTRECEPIE(recepie) {
    DictRecepies[recepie.title] = recepie;
    await new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('data', JSON.stringify(DictRecepies)), 1000))).then( () => {return} );
    return
}
async function POSTIMAGE(image, title) {
    try {
        Images[title] = image;
        await new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('images', JSON.stringify(Images)), 1000))).then( () => {return} );
    }
    catch (err){
        Images[title] = "";
        await new Promise((resolve) => resolve(setTimeout(() => localStorage.setItem('images', JSON.stringify(Images)), 1000))).then( () => {return} );
    }
    return
}
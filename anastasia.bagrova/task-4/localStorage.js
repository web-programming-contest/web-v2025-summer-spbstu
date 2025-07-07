function saveToLocalStorage(libraries){
    if (!Array.isArray(libraries)){
        throw new Error('Библиотеки должны быть переданы в виде массива');
    }
    if (!libraries.every((lib) => lib instanceof Library)){
        throw new Error('Все элементы должны принадлежать классу Library');
    }

    localStorage.setItem('libraries', JSON.stringify(libraries));
}

function loadFromLocalStorage(){
    const librariesJSON = localStorage.getItem('libraries');
    if (!librariesJSON){
        return [];
    }

    try{
        const libraries = JSON.parse(librariesJSON);
        if (!Array.isArray(libraries)){
            throw new Error('Библиотеки должны быть записаны в виде массива');
        }

        return libraries.map((lib) => {
            if (!lib.name || !Array.isArray(lib.books)){
                throw new Error('Некорректный формат данных о библиотеке. Библиотека должна иметь название и массив объектов книг');
            }
            const newLibrary = new Library(lib.name);
            lib.books.forEach((book) => newLibrary.addBook(book));
            return newLibrary;
        })
    } catch(error){
        console.log('Ошибка при загрузке библиотек из localStorage:', error.message);
        return [];
    }
}

let libraries = loadFromLocalStorage();
if (libraries.length === 0){
    const book1 = {
        title: 'Капитанская дочка',
        author: 'Пушкин',
        year: 1836,
        genre: 'исторический роман'
    }
    const book2 = {
        title: 'Война и мир',
        author: 'Толстой',
        year: 1869,
        genre: 'роман-эпопея'
    }
    const book3 = {
        title: 'Преступление и наказание',
        author: 'Достоевский',
        year: 1866,
        genre: 'роман'
    }
    const book4 = {
        title: 'Мастер и Маргарита',
        author: 'Булгаков',
        year: 1966,
        genre: 'роман'
    }
    const book5 = {
        title: 'Герой нашего времени',
        author: 'Лермантов',
        year: 1840,
        genre: 'роман'
    }
    const book6 = {
        title: 'Что делать?',
        author: 'Чернышевский',
        year: 1863,
        genre: 'роман'
    }


    libraries = [
        new Library('library1', [book6]),
        new Library('library2', [book1,book2,book3,book4,book5]),
    ];
    saveToLocalStorage(libraries);
}


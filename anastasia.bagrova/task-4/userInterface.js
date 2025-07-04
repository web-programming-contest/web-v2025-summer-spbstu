'use strict';

let timeout = 500;

const addLibraryButton = document.querySelector('aside button');
const inputAddLibrary = document.getElementById('library-name');
addLibraryButton.addEventListener('click', async () => {
    let nameLibrary = inputAddLibrary.value.trim();
    if (nameLibrary){
        nameLibrary = nameLibrary[0].toUpperCase() + nameLibrary.slice(1);
        
        let promise = new Promise((fulfill) => {
            setTimeout(() => {
                try{
                    if (!(libraries.some((lib) => lib.name === nameLibrary))){
                        libraries.push(new Library(nameLibrary));
                        fulfill();
                    } else {
                        alert('Библиотека с таким названием уже существует');
                    }
                } catch(error) {
                    throw new Error('Ошибка при создании новой библиотеки: ' + error.message);
                }
            }, timeout);
        });

        promise
            .then(function() {
                saveToLocalStorage(libraries);
                renderLibraries();

                inputAddLibrary.value = '';
        })
            .catch(function(error) {
                alert(error);
        });
    }
});

function renderBooks(library, booksContainer){
    library.books.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'library-card-book';

        const bookTitle = document.createElement('h4');
        bookTitle.textContent = book.title;

        const bookInfoList = document.createElement('ul');

        const liAuthor = document.createElement('li');
        liAuthor.textContent = 'Автор: ' + book.author;
        bookInfoList.appendChild(liAuthor);
        const liYear = document.createElement('li');
        liYear.textContent = 'Год издания: ' + book.year;
        bookInfoList.appendChild(liYear);
        const liGenre = document.createElement('li');
        liGenre.textContent = 'Жанр: ' + book.genre;
        bookInfoList.appendChild(liGenre);

        const bookDeleteButton = document.createElement('button');
        bookDeleteButton.textContent = 'Удалить книгу';
        bookDeleteButton.onclick = async () => {
            let promise = new Promise((fulfill) => {
                setTimeout(() => {
                    try{
                        library.removeBook(book.title);
                        fulfill();
                    } catch(error) {
                        throw new Error('Ошибка при удалении книги: ' + error.message);
                    }
                }, timeout);
            });

            promise
                .then(function() {
                    saveToLocalStorage(libraries);
                    booksContainer.removeChild(bookCard);
                    booksContainer.previousElementSibling.textContent = `${library.name} (книг: ${library.booksCount})`;
            })
                .catch(function(error) {
                    alert(error);
            });
        };

        bookCard.append(bookTitle, bookInfoList, bookDeleteButton);
        booksContainer.appendChild(bookCard);
    });

}

function renderLibraries(){
    const librariesContainer = document.getElementById('librariesContainer');
    librariesContainer.innerHTML = '';

    libraries.forEach((lib, index) => {
        const libCard = document.createElement('div');
        libCard.className = 'library-card';

        const title = document.createElement('h3');
        title.textContent = `${lib.name} (${lib.booksCount} книг)`;
        libCard.appendChild(title);

        const booksContainer = document.createElement('div');
        booksContainer.className = 'library-card-books';
        renderBooks(lib, booksContainer);

        title.textContent = `${lib.name} (книг: ${lib.booksCount})`;
        libCard.appendChild(title);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'library-card-buttons';

        const addBookButtonStart = document.createElement('button');
        addBookButtonStart.textContent = 'Добавить книгу';
        addBookButtonStart.className = 'library-card-buttons-addStart'

        addBookButtonStart.onclick = () => {
            const modalShow = document.createElement('div');
            modalShow.className = 'library-card-modalShow';
            const bookFormModalShadow = document.createElement('form');
            bookFormModalShadow.className = 'library-card-formModal';

            const bookFormInfo = document.createElement('div');
            bookFormInfo.className = 'library-card-formModalInfo';
            const text = document.createElement('h2');
            text.textContent = 'Добавление новой книги';
            bookFormInfo.appendChild(text);

            const bookTitle = document.createElement('input');
            bookTitle.setAttribute('id','book-title');
            bookTitle.setAttribute('placeholder','Название книги');

            const bookAuthor = document.createElement('input');
            bookAuthor.setAttribute('id','book-author');
            bookAuthor.setAttribute('placeholder','Автор');

            const bookYear = document.createElement('input');
            bookYear.setAttribute('type','number');
            bookYear.setAttribute('id','book-title');
            bookYear.setAttribute('placeholder','Год издания');

            const bookGenre = document.createElement('input');
            bookYear.setAttribute('id','book-genre');
            bookGenre.setAttribute('placeholder','Жанр');

            bookFormInfo.append(bookTitle, bookAuthor, bookYear, bookGenre);

            const bookFormButtons = document.createElement('div');
            bookFormButtons.className = 'library-card-formModalActions';

            const addBookButton = document.createElement('button');
            addBookButton.className = 'library-card-formButton active';
            addBookButton.textContent = 'Добавить';
            
            addBookButton.onclick = async (event) => {
                event.preventDefault();
                const book = {
                    title: bookTitle.value.trim(),
                    author: bookAuthor.value.trim(),
                    year: bookYear.value,
                    genre: bookGenre.value.trim(),
                };
                const promise = new Promise((fulfill, reject) => {
                    setTimeout(() => {
                        try{
                            const isSuccess = lib.addBook(book);
                            if (!isSuccess){
                                throw new Error(`Данная книга уже существует в библиотеке ${lib.name}`);
                            }
                            fulfill();
                        } catch (error){
                            reject(error);
                        }
                    }, timeout);
                });

                promise
                    .then(function() {
                        saveToLocalStorage(libraries);

                        bookTitle.value = '';
                        bookAuthor.value = '';
                        bookYear.value = '';
                        bookGenre.value = '';
                        
                        booksContainer.previousElementSibling.textContent = `${lib.name} (книг: ${lib.booksCount})`;
                        
                        bookFormModalShadow.style.display = 'none';
                        modalShow.style.display = 'none';

                        renderLibraries();
                })
                    .catch(function(error) {
                        alert(error);
                });
            };

            const closeBookButton = document.createElement('button');
            closeBookButton.className = 'library-card-formButton close';
            closeBookButton.textContent = 'Закрыть';
            closeBookButton.onclick = () => bookFormModalShadow.style.display = 'none';
            
            bookFormButtons.append(addBookButton, closeBookButton);

            bookFormModalShadow.append(bookFormInfo, bookFormButtons);

            modalShow.appendChild(bookFormModalShadow);
            modalShow.style.display = 'flex';

            libCard.append(modalShow);
        }
        
        const removeLibButton = document.createElement('button');
        removeLibButton.textContent = 'Удалить библиотеку';
        removeLibButton.className = 'library-card-buttons-removeLib';
        removeLibButton.onclick = async () => {
            let promise = new Promise((fulfill) => {
                setTimeout(() => {
                    try{
                        libraries.splice(index, 1);
                        fulfill();
                    } catch(error) {
                        throw new Error('Ошибка при удалении библиотеки: ' + error.message);
                    }
                }, timeout);
            });

            promise
                .then(function() {
                    saveToLocalStorage(libraries);
                    renderLibraries();
            })
                .catch(function(error) {
                    alert(error);
            });
        };
        
        buttonsContainer.append(addBookButtonStart, removeLibButton);
        libCard.append(booksContainer,buttonsContainer);

        librariesContainer.append(libCard);
    })
}


renderLibraries();
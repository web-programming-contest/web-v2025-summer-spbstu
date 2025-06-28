class LibraryManager {
  contructor() {
    this.libraries = JSON.parse(localStorage.getItem('libraries')) || [];
      this.currentLibraryId = localStorage.getItem('currentLibraryId') || null;

      this.initElements();
      this.renderLibrariesSelect();
      this.renderBooks();

      this.setupEventListeners();
  }

  initElements() {
    this.elements = {
      libraryName: document.getElementById("libraryName"),
      librarySelect: document.getElementById("librarySelect"),
      addLibButton: document.getElementById("addLibButton"),
      removeLibButton: document.getElementById("removeLibButton"),
      bookTitle: document.getElementById("bookTitle"),
      bookAuthor: document.getElementById("bookAuthor"),
      bookYear: document.getElementById("bookYear"),
      bookGenre: document.getElementById("bookeGenre"),
      addBookButton: document.getElementById("addBookButton"),
      booksContainer: document.getElementById("booksContainer")
    }
  }

  setupEventListeners() {
    this.elements.addLibButton.addEventListener('click', () => this.addLibrary());
    this.elements.removeLibButton.addEventListener('click', () => this.removeLibrary());
    this.elements.addBookButton.addEventListener('click', () => this.addBook());
    this.elements.librarySelect.addEventListener('change', (e) => {
      this.currentLibraryId = e.target.value;
      localStorage.setItem('currenLibraryId', this.currentLibraryId);
      this.renderBooks();
    });
  }

  async addLibrary() {
    const name = this.elements.libraryName.value.trim();
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newLibrary = {
        id: Date.now().toString(),
        name,
        books: []
      };
      this.libraries.push(newLibrary);
      this.saveToLocalStorage();
      this.renderLibrariesSelect();
      this.elements.libraryName.value = "";
      this.currentLibraryId = newLibrary.id;
      localStorage.setItem('currenLibraryId', this.currentLibraryId);
      this.renderBooks();
    } catch (error) {
      alert("Error. The library was not added: "  + error.message);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('libraries', JSON.stringify(this.libraries));
  }

  async removeLibrary() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      this.libraries = this.libraries.filter(lib => lib.id !== this.currentLibraryId);
      if (this.libraries.length > 0) {
        this.currentLibraryId = this.libraries[0].id;
      } else {
        this.currentLibraryId = null;
      }
      localStorage.setItem('currenLibraryId', this.currentLibraryId);
      this.saveToLocalStorage();
      this.renderLibrariesSelect();
      this.renderBooks();
    } catch (error) {
      alert("Error. The library was not removed: " + error.message);
    }
  }

  async addBook() {
    const title = this.elements.bookTitle.value.trim();
    const author = this.elements.bookAuthor.value.trim();
    const year = this.elements.bookYear.value.trim();
    const genre = this.elements.bookGenre.value.trim();

    if (!title || !author || !year || !genre) {
      return alert("Fill in all fields of the form");
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newBook = {
        id: Date.now().toString(),
        title,
        author,
        year: parseInt(year),
        genre
      };

      const library = this.libraries.find(lib => lib.id === this.currentLibraryId);
      library.books.push(newBook);
      this.saveToLocalStorage();
      this.renderBooks();

      this.elements.bookTitle.value = '';
      this.elements.bookAuthor.value = '';
      this.elements.bookYear.value = '';
      this.elements.bookGenre.value = '';

    } catch (error) {
      alert("Error. The book was not added: " + error.message);
    }
  }

  async removeBook(bookId) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const library = this.libraries.find(lib => lib.id === this.currentLibraryId);
      library.books = library.books.filter(book => book.id !== bookId);
      this.saveToLocalStorage();
      this.renderBooks();
    } catch (error) {
      alert("Error. The book was not removed: " + error.message);
    }
  }

  renderLibrariesSelect() {
    const select = this.elements.librarySelect;
    select.innerHTML = '';

    if (this.libraries.length === 0) {
      select.disabled = true;
      this.elements.removeLibraryBtn.disabled = true;
      return;
    }

    select.disabled = false;
    this.elements.removeLibraryBtn.disabled = false;

    this.libraries.forEach(library => {
      const option = document.createElement('option');
      option.value = library.id;
      option.textContent = library.name;
      select.appendChild(option);
    });

    if (this.currentLibraryId && this.libraries.some(lib => lib.id === this.currentLibraryId)) {
      select.value = this.currentLibraryId;
    } else if (this.libraries.length > 0) {
      this.currentLibraryId = this.libraries[0].id;
      select.value = this.currentLibraryId;
      localStorage.setItem('currentLibraryId', this.currentLibraryId);
    }
  }
}
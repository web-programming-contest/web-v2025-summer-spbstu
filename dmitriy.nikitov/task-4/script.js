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
    this.elements.addLibButton.addEventListener('click', () => this.addLib());
    this.elements.removeLibButton.addEventListener('click', () => this.removeLib());
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
      alert("Error: The library was not added");
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('libraries', JSON.stringify(this.libraries));
  }
}
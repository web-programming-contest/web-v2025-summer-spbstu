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
}
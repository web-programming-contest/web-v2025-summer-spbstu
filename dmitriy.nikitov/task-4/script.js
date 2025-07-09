import { Library } from "./library.js";

class LibraryManager {
  constructor() {
    this.librariesData = JSON.parse(localStorage.getItem('libraries')) || [];
    this.libraries = this.librariesData.map(lib => Library.fromJSON(lib));
    this.currentLibraryName = localStorage.getItem('currentLibraryName') || null;

    this.initElements();
    this.setupEventListeners();
    this.renderLibrariesSelect();
    this.renderBooks();
  }

  initElements() {
    this.elements = {
      libraryName: document.getElementById("library-name"),
      librarySelect: document.getElementById("library-select"),
      addLibButton: document.getElementById("add-lib-button"),
      removeLibButton: document.getElementById("remove-lib-button"),
      bookTitle: document.getElementById("book-title"),
      bookAuthor: document.getElementById("book-author"),
      bookYear: document.getElementById("book-year"),
      bookGenre: document.getElementById("book-genre"),
      addBookButton: document.getElementById("add-book-button"),
      booksContainer: document.getElementById("books-container")
    }
  }

  setupEventListeners() {
    this.elements.addLibButton.addEventListener("click", () => this.addLibrary());
    this.elements.removeLibButton.addEventListener("click", () => this.removeLibrary());
    this.elements.addBookButton.addEventListener("click", () => this.addBook());
    this.elements.librarySelect.addEventListener("change", (e) => {
      this.currentLibraryName = e.target.value;
      localStorage.setItem("currentLibraryName", this.currentLibraryName);
      this.renderBooks();
    });
  }

  async addLibrary() {
    const name = this.elements.libraryName.value.trim();
    if (!name) {
      return alert("Enter library name.");
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 10));
      if (this.libraries.find(lib => lib.name === name)) {
        throw new Error("Library with current name already exist.");
      }
      const newLibrary = new Library(name);
      this.libraries.push(newLibrary);
      this.saveToLocalStorage();
      this.elements.libraryName.value = "";
      this.currentLibraryName = newLibrary.name;
      this.renderLibrariesSelect();
      localStorage.setItem("currentLibraryName", this.currentLibraryName);
      this.renderBooks();
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  async removeLibrary() {
    try {
      await new Promise(resolve => setTimeout(resolve, 10));

      if (!this.currentLibraryName) {
        throw new Error("No library selected to remove");
      }

      this.libraries = this.libraries.filter(lib => lib.name !== this.currentLibraryName);
      if (this.libraries.length !== 0) {
        this.currentLibraryName = this.libraries[0].name;
      } else {
        this.currentLibraryName = null;
      }
      localStorage.setItem("currentLibraryName", this.currentLibraryName);
      this.saveToLocalStorage();
      this.renderLibrariesSelect();
      this.renderBooks();
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  async addBook() {
    const title = this.elements.bookTitle.value.trim();
    const author = this.elements.bookAuthor.value.trim();
    const year = this.elements.bookYear.value.trim();
    const genre = this.elements.bookGenre.value.trim();

    if (!title || !author || !year || !genre) {
      return alert("Fill in all fields of the form.");
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 10));
      const newBook = {
        title,
        author,
        year: parseInt(year),
        genre
      };

      const library = this.libraries.find(lib => lib.name === this.currentLibraryName);
      if (!library) {
        throw new Error("The book was not added.");
      }
      library.addBook(newBook);
      this.saveToLocalStorage();
      this.renderBooks();

      this.elements.bookTitle.value = "";
      this.elements.bookAuthor.value = "";
      this.elements.bookYear.value = "";
      this.elements.bookGenre.value = "";

    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  async removeBook(title) {
    try {
      await new Promise(resolve => setTimeout(resolve, 10));

      const library = this.libraries.find(lib => lib.name === this.currentLibraryName);
      library.removeBook(title);
      this.saveToLocalStorage();
      this.renderBooks();
    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  renderLibrariesSelect() {
    const select = this.elements.librarySelect;
    select.innerHTML = '';

    if (this.libraries.length === 0) {
      select.disabled = true;
      this.elements.removeLibButton.disabled = true;
      return;
    }

    select.disabled = false;
    this.elements.removeLibButton.disabled = false;

    this.libraries.forEach(library => {
      const option = document.createElement("option");
      option.value = library.name;
      option.textContent = library.name;
      select.appendChild(option);
    });

    if (this.currentLibraryName && this.libraries.some(lib => lib.name === this.currentLibraryName)) {
      select.value = this.currentLibraryName;
    } else if (this.libraries.length !== 0) {
      this.currentLibraryName = this.libraries[0].name;
      select.value = this.currentLibraryName;
      localStorage.setItem("currentLibraryName", this.currentLibraryName);
    }
  }

  renderBooks() {
    const container = this.elements.booksContainer;
    container.innerHTML = "";

    if (!this.currentLibraryName) {
      container.innerHTML = "<p>Select or create library</p>";
      return;
    }

    const library = this.libraries.find(lib => lib.name === this.currentLibraryName);
    if (!library) return;

    if (library.getBooksCount() === 0) {
      container.innerHTML = "<p>Library is empty</p>";
      return;
    }

    library.books.forEach(book => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <button class="remove-button" data-book-title="${ book.title }">×</button>
        <h3>${ book.title }</h3>
        <p><strong>Author:</strong> ${ book.author }</p>
        <p><strong>Year:</strong> ${ book.year }</p>
        <p><strong>Genre:</strong> ${ book.genre }</p>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".remove-button").forEach(button => {
      button.addEventListener("click", (e) => {
        const title = e.target.getAttribute("data-book-title");
        this.removeBook(title);
      });
    });
  }

  saveToLocalStorage() {
    localStorage.setItem("libraries", JSON.stringify(this.libraries));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new LibraryManager();
});
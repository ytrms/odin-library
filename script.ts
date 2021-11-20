// 1. Have a list of books in a library array
// 2. Show those books in cards/a list
// 3. Have a button where people can add a new book
// 4. Have a button on each card where users can delete the book
// 5. Have a button on each card where users can change the read status of the book

class Book {
  name: string;
  author: string;
  pages: number;
  read: boolean;

  constructor(name: string, author: string, pages: number, read: boolean) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

// sample data for the library
const got = new Book("A Game of Thrones", "George Martin", 800, true);
const lotr = new Book("The Fellowship of the Ring", "JRR Tolkien", 1000, true);
const hobbit = new Book("The Hobbit", "JRR Tolkien", 300, false);
let myLibrary = [got, lotr, hobbit];

const list = document.getElementsByClassName('list')[0];

// LIBRARY MANAGEMENT LOGIC //

/**
 * Takes a book and returns a formatted card with the book's information.
 * @param book Book for which you want to get the card
 * @returns Card with the given book's information
 */
function getBookCard(book: Book, bookIndex: number) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = String(bookIndex);

  let cardTitle = document.createElement('div');
  cardTitle.classList.add('cardTitle');
  cardTitle.textContent = book.name;

  let cardAuthor = document.createElement('div');
  cardAuthor.classList.add('cardAuthor');
  cardAuthor.textContent = book.author;

  let cardPages = document.createElement('div');
  cardPages.classList.add('cardPages');
  cardPages.textContent = String(book.pages) + " pages";

  let cardReadStatus = document.createElement('div');
  cardReadStatus.classList.add('cardReadStatus');
  if (book.read) {
    cardReadStatus.textContent = "Read";
    cardReadStatus.classList.add('read');
  } else {
    cardReadStatus.textContent = "Not read yet";
    cardReadStatus.classList.add('unread');
  }

  let deleteCardButton = document.createElement('button');
  deleteCardButton.classList.add('deleteCardButton');
  deleteCardButton.textContent = "Delete";

  let toggleReadButton = document.createElement('button');
  toggleReadButton.classList.add('toggleReadButton');
  toggleReadButton.textContent = "Toggle Read";

  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  card.appendChild(cardReadStatus);
  card.appendChild(deleteCardButton);
  card.appendChild(toggleReadButton);
  return card;
}

/**
 * Takes a library and draws its books on the given container as cards.
 * The function clears the existing cards before drawing new ones.
 * @param library Library array containing Book instances
 */
function refreshList(library: Book[], container: Element) {
  container.innerHTML = "";
  library.forEach((book, index) => {
    const card = getBookCard(book, index);
    container.appendChild(card);
  });
}

// NEW BOOK BUTTON LOGIC //

/**
 * Gets new book information from the user and an existing library.
 * Returns a new library with the existing books plus the new book appended.
 * @returns A new library with the given book added.
 */
function addBookToLibrary(library: Book[]) {
  let title = null;
  while (title == null || title == "") {
    title = prompt("Please enter the title of the book:");
    console.log(title);
  }
  let author = null;
  while (author == null || author == "") {
    author = prompt("Please enter the author of the book:");
  }
  let pages = null;
  while (pages == null || pages == "" || Number.isNaN(Number(pages))) {
    pages = prompt("Please enter the number of pages in the book: (must be a number)");
  }
  let read = null;
  let readBool = false;
  while (read == null || read == "") {
    read = prompt("Have you read the book? yes/no");
    read === "yes" ? readBool = true : readBool = false;
  }
  return [...library, new Book(title, author, Number(pages), readBool)];
}

/**
 * Handles what happens when the user clicks on "Add Book."
 * It adds a new book to the given library,
 * updates the global library,
 * refreshes the cards on screen,
 * and activates the delete buttons.
 * @param library Library of books to show on screen
 * @param container Element to contain the book cards
 */
function newBookButtonClickHandler(library: Book[], container: Element) {
  const newLib = addBookToLibrary(library);
  myLibrary = [...newLib];
  refreshList(myLibrary, container);
  activateDeleteButtons();
  activateToggleButtons();
}

// DELETE BUTTON LOGIC //

/**
 * Deletes a given book from a given library.
 * @param bookId Index of the book to delete
 * @param library Library to delete the book from
 * @returns New library without the book given
 */
function removeBookFromLibrary(bookId: number, library: Book[]) {
  return library.filter((book, index) => {
    return bookId != index;
  })
}

/**
 * Handles what happens when a user clicks on a delete button.
 * It removes a book from the library, updates the global library,
 * refreshes the screen, and activates the delete buttons.
 * @param e Event on delete button
 */
function deleteBookButtonClickHandler(e: Event) {
  const libWithBookRemoved = removeBookFromLibrary(Number(e.target['parentElement'].dataset.id), myLibrary);
  myLibrary = [...libWithBookRemoved];
  refreshList(myLibrary, list);
  activateDeleteButtons();
  activateToggleButtons();
}

/**
 * Adds event listeners to delete buttons
 */
function activateDeleteButtons() {
  let deleteBookButtons = document.getElementsByClassName('deleteCardButton');
  for (let i = 0; i < deleteBookButtons.length; i++) {
    const button = deleteBookButtons[i];
    button.addEventListener('click', (e) => {
      deleteBookButtonClickHandler(e);
    })
  }
}

// TOGGLE READ STATUS BUTTONS LOGIC //

function activateToggleButtons() {
  let toggleReadStatusButtons = document.getElementsByClassName('toggleReadButton');
  for (let i = 0; i < toggleReadStatusButtons.length; i++) {
    const button = toggleReadStatusButtons[i];
    button.addEventListener('click', (e) => {
      toggleReadButtonClickHandler(e);
    })
  }
}

function toggleReadButtonClickHandler(e: Event) {
  const bookIndex = Number(e.target['parentElement'].dataset.id)
  myLibrary[bookIndex].toggleReadStatus();
  refreshList(myLibrary, list);
  activateDeleteButtons();
  activateToggleButtons();
}

function main() {
  refreshList(myLibrary, list);

  const newBookButton = document.getElementsByClassName('addBook')[0];
  newBookButton.addEventListener('click', () => newBookButtonClickHandler(myLibrary, list));

  activateDeleteButtons();
  activateToggleButtons();
}

main();
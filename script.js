// 1. Have a list of books in a library array
// 2. Show those books in cards/a list
// 3. Have a button where people can add a new book
// 4. Have a button on each card where users can delete the book
// 5. Have a button on each card where users can change the read status of the book
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Book = /** @class */ (function () {
    function Book(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    return Book;
}());
// sample data for the library
var got = new Book("A Game of Thrones", "George Martin", 800, true);
var lotr = new Book("The Fellowship of the Ring", "JRR Tolkien", 1000, true);
var hobbit = new Book("The Hobbit", "JRR Tolkien", 300, false);
var myLibrary = [got, lotr, hobbit];
var list = document.getElementsByClassName('list')[0];
/**
 * Takes a book and returns a formatted card with the book's information.
 * @param book Book for which you want to get the card
 * @returns Card with the given book's information
 */
function getBookCard(book, bookIndex) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = String(bookIndex);
    var cardTitle = document.createElement('div');
    cardTitle.classList.add('cardTitle');
    cardTitle.textContent = book.name;
    var cardAuthor = document.createElement('div');
    cardAuthor.classList.add('cardAuthor');
    cardAuthor.textContent = book.author;
    var cardPages = document.createElement('div');
    cardPages.classList.add('cardPages');
    cardPages.textContent = String(book.pages) + " pages";
    var cardReadStatus = document.createElement('div');
    cardReadStatus.classList.add('cardReadStatus');
    if (book.read) {
        cardReadStatus.textContent = "Read";
        cardReadStatus.classList.add('read');
    }
    else {
        cardReadStatus.textContent = "Not read yet";
        cardReadStatus.classList.add('unread');
    }
    var deleteCardButton = document.createElement('button');
    deleteCardButton.classList.add('deleteCardButton');
    deleteCardButton.textContent = "Delete";
    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(cardReadStatus);
    card.appendChild(deleteCardButton);
    return card;
}
/**
 * Takes a library and draws its books on the given container as cards.
 * The function clears the existing cards before drawing new ones.
 * @param library Library array containing Book instances
 */
function refreshList(library, container) {
    container.innerHTML = "";
    library.forEach(function (book, index) {
        var card = getBookCard(book, index);
        container.appendChild(card);
    });
}
/**
 * Gets new book information from the user and an existing library.
 * Returns a new library with the existing books plus the new book appended.
 * @returns A new library with the given book added.
 */
function addBookToLibrary(library) {
    var title = prompt("Title of the book");
    var author = prompt("Author of the book");
    var pages = prompt("Number of pages in the book");
    var read = prompt("Have you read the book? yes/no");
    var readBool = false;
    read === "yes" ? readBool = true : readBool = false;
    return __spreadArray(__spreadArray([], library, true), [new Book(title, author, Number(pages), readBool)], false);
}
/**
 * Handles what happens when the user clicks on "Add Book"
 * @param library Library of books to show on screen
 * @param container Element to contain the book cards
 */
function newBookButtonClickHandler(library, container) {
    var newLib = addBookToLibrary(library);
    myLibrary = __spreadArray([], newLib, true);
    refreshList(myLibrary, container);
    activateDeleteButtons();
}
function removeBookFromLibrary(bookId, library) {
    return library.filter(function (book, index) {
        return bookId != index;
    });
}
refreshList(myLibrary, list);
var newBookButton = document.getElementsByClassName('addBook')[0];
newBookButton.addEventListener('click', function () { return newBookButtonClickHandler(myLibrary, list); });
function deleteBookButtonClickHandler(e) {
    var libWithBookRemoved = removeBookFromLibrary(Number(e.target['parentElement'].dataset.id), myLibrary);
    myLibrary = __spreadArray([], libWithBookRemoved, true);
    refreshList(myLibrary, list);
    var deleteBookButtons = document.getElementsByClassName('deleteCardButton');
    console.log({ myLibrary: myLibrary }, { deleteBookButtons: deleteBookButtons });
    activateDeleteButtons();
}
function activateDeleteButtons() {
    var deleteBookButtons = document.getElementsByClassName('deleteCardButton');
    for (var i = 0; i < deleteBookButtons.length; i++) {
        var button = deleteBookButtons[i];
        button.addEventListener('click', function (e) {
            deleteBookButtonClickHandler(e);
        });
    }
}
activateDeleteButtons();

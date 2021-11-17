//@ts-check

class Book {
    /**
     * @param {string} name
     * @param {string} author
     * @param {number} pages
     * @param {boolean} read
     */
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        this.readStatus = "";
        this.read ? this.readStatus = "read" : this.readStatus = "not read yet";
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.readStatus}.`
    }
}

const got = new Book("A Game of Thrones", "George Martin", 800, true);
const lotr = new Book("The Fellowship of the Ring", "JRR Tolkien", 1000, true);
const hobbit = new Book("The Hobbit", "JRR Tolkien", 300, false);
let myLibrary = [got, lotr, hobbit];

const cards = document.getElementsByClassName('bookList')[0];

function addBookToLibrary() {
    const title = prompt("Title of the book");
    const author = prompt("Author of the book");
    const pages = prompt("Number of pages in the book");
    const read = prompt("Have you read the book? yes/no");
    let readBool = false;
    read === "yes" ? readBool = true : readBool = false;
    myLibrary.push(new Book(title, author, Number(pages), readBool));
}

/**
 * Gets a Book object and returns a formatted card
 * for the book.
 * @param {Book} book 
 * @param {number} id
 */
function getBookCard(book, id) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = String(id);

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

    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(cardReadStatus);
    card.appendChild(deleteCardButton);
    return card;
}

/**
 * Refreshes the book list and cards pulling info
 * from the given library.
 * @param {Book[]} [library]
 */
function refreshBookList(library) {
    cards.innerHTML = "";
    for (const key in library) {
        if (Object.hasOwnProperty.call(library, key)) {
            const book = library[key];
            cards.appendChild(getBookCard(book, Number(key)));
        }
    }
}

/**
 * Removes a book from the library given its name.
 * @param {string} bookTitle
 * @param {Book[]} [library] library
 */
function removeBookFromLibrary(bookTitle, library) {
    const cards = document.getElementsByClassName('card');
    for (const key in library) {
        if (Object.hasOwnProperty.call(library, key)) {
            const book = library[key];
            const cardToDelete = document.querySelector(`[data-id=${key}]`);
        }
    }
}

const addBookButton = document.getElementsByClassName('addBook')[0];
addBookButton.addEventListener('click', () => {
    addBookToLibrary();
    refreshBookList();
});

const deleteBookButtons = document.getElementsByClassName('deleteCardButton');
console.log(deleteBookButtons);

refreshBookList(myLibrary);
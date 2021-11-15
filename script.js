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
const hobbit = new Book("The Hobbit", "JRR Tolkien", 300, true);
let myLibrary = [got, lotr, hobbit];

const cards = document.getElementsByClassName('bookList')[0];

function addBookToDB() {
    const title = prompt("Title of the book");
    const author = prompt("Author of the book");
    const pages = prompt("Number of pages in the book");
    const read = prompt("Have you read the book? true/false");
    myLibrary.push(new Book(title, author, Number(pages), Boolean(read)));
}

/**
 * Gets a Book object and returns a formatted card
 * for the book.
 * @param {Book} book 
 */
function getBookCard(book) {
    let card = document.createElement('div');
    card.classList.add('card');

    let cardTitle = document.createElement('div');
    cardTitle.classList.add('cardTitle');
    cardTitle.textContent = book.name;

    let cardAuthor = document.createElement('div');
    cardAuthor.classList.add('cardAuthor');
    cardAuthor.textContent = book.author;

    let cardPages = document.createElement('div');
    cardPages.classList.add('cardPages');
    cardPages.textContent = String(book.pages);

    let cardReadStatus = document.createElement('div');
    cardReadStatus.classList.add('cardReadStatus');
    if (book.read) {
        cardReadStatus.textContent = "Read";
        cardReadStatus.classList.add('read');
    } else {
        cardReadStatus.textContent = "Not read yet";
        cardReadStatus.classList.add('unread');
    }

    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardPages);
    card.appendChild(cardReadStatus);
    return card;
}

function refreshBookList() {
    cards.innerHTML = "";
    for (const key in myLibrary) {
        if (Object.hasOwnProperty.call(myLibrary, key)) {
            const book = myLibrary[key];
            cards.appendChild(getBookCard(book));
        }
    }
    console.log({ myLibrary });
}

const addBookButton = document.getElementsByClassName('addBook')[0];
addBookButton.addEventListener('click', () => {
    addBookToDB();
    refreshBookList();
});

refreshBookList();
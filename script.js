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
let myLibrary = [got, lotr];

const bookTable = document.getElementsByClassName('bookList')[0];

function addBookToDB() {
    const title = prompt("Title of the book");
    const author = prompt("Author of the book");
    const pages = prompt("Number of pages in the book");
    const read = prompt("Have you read the book? true/false");
    myLibrary.push(new Book(title, author, Number(pages), Boolean(read)));
    refreshBookList();
}

function refreshBookList() {
    bookTable.innerHTML = "";
    for (const key in myLibrary) {
        if (Object.hasOwnProperty.call(myLibrary, key)) {
            const book = myLibrary[key];
            let bookCard = document.createElement('div');
            bookCard.classList.toggle('card');
            bookCard.textContent = book.info();
            bookTable.appendChild(bookCard);
        }
    }
}

const addBookButton = document.getElementsByClassName('addBook')[0];
addBookButton.addEventListener('click', addBookToDB);
refreshBookList();
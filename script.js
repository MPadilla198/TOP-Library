const myLibrary = [];

function Book(uuid, title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.uuid = uuid;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author} ${pages} pages, ${this.read ? "read" : "not read yet"}`;
}

function addBookToLibrary(title, author, pages, read) {
    const uuid = self.crypto.randomUUID();

    const book = new Book(uuid, title, author, pages, read);

    myLibrary.push(book);
}

function displayBooks() {
    const body = document.querySelector(".container");
    for (const book of myLibrary) {
        // Create new card
        const card = document.createElement("div");
        card.classList.add("card")

        // Create title heading and add to card
        const title = document.createElement("h1");
        title.textContent = book.title;
        card.appendChild(title);

        // Create author heading and add to card
        const author = document.createElement("h2");
        author.textContent = book.author;
        card.appendChild(author);

        // Create pages text and add to card
        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`
        card.appendChild(pages);

        // Create read text and add to card
        const read = document.createElement("p");
        read.textContent = book.read ? "read" : "not read yet";
        card.appendChild(read);

        // Add card to body
        body.appendChild(card);
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Charlie and The Chocolate Factory", "Roald Dahl", 192, true);

displayBooks();
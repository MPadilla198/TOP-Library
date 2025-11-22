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

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function displayBooks() {
    const container = document.querySelector(".container");

    // Clear children
    removeAllChildNodes(container);

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

        // Create remove book button and add to card
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Book From Library';
        removeButton.dataset.uuid = book.uuid;
        // Adding an eventlistener to each button is inefficient, should be updated later
        removeButton.addEventListener('click', (event) => {
            for (let i = 0; i < myLibrary.length; i++) {
                const b = myLibrary[i];
                if (book.uuid === b.uuid) {
                    myLibrary.splice(i, 1);
                    break;
                }
            }

            displayBooks();
        })
        card.appendChild(removeButton);

        // Add card to body
        container.appendChild(card);
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Charlie and The Chocolate Factory", "Roald Dahl", 192, true);

displayBooks();

const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector("#add-book");
const submitButton = document.querySelector("dialog .submit");
const cancelButton = document.querySelector("dialog .cancel");

// "Show the dialog" button opens the dialog modally
addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Submit" button closes the dialog
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const titleElem = document.getElementById('title');
    const title = titleElem.value.trim();
    if (title === ''){
        alert('Title is required!');
        return;
    }

    const authorElem = document.getElementById('author');
    const author = authorElem.value.trim();
    if (author === ''){
        alert('Author is required!');
        return;
    }

    const pagesElem = document.getElementById('pages');
    const pages = pagesElem.value;
    if (pages < 1) {
        alert('Pages must be a positive number!');
        return;
    }

    const readElem = document.getElementById('read');
    const read = readElem.checked;

    // reset the input fields
    titleElem.value = '';
    authorElem.value = '';
    pagesElem.value = '';
    readElem.checked = false;

    // Update library and display books
    addBookToLibrary(title, author, pages, read);
    displayBooks();

    dialog.close();
});

// "Cancel" button closes the dialog
cancelButton.addEventListener("click", () => {
    dialog.close();
});
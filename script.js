const parent_main = document.querySelector('main');
const rmv_btns = document.querySelectorAll('.remove');
const dialog = document.querySelector('dialog');
const dialog_show = document.querySelector('header button');
const dialog_close = document.querySelector('button.close');
const dialog_add = document.querySelector('button[type="submit"]');
const form = document.querySelector('dialog form');
const reset_btn = document.querySelector('button[type="reset"]');

parent_main.addEventListener("click", (e) => {
    const card = e.target.closest('.book');
    const card_id = card.id;
    if(e.target.classList.contains('remove')) {

        // remove book object from library
        removeBookFromLibrary(card_id);

        console.log("Remove button clicked");
        console.log(card_id);
        console.log(myLibrary);

        // remove book card from web page
        if(card) {
            card.remove();
        }
    }

    if(e.target.classList.contains('read')) {
        e.target.textContent = 
            e.target.textContent === "Yes" ? "No" : "Yes"; 
        for(let i=0; i<myLibrary.length; i++) {
            if(card_id === myLibrary[i].id) {
                myLibrary[i].readToggle(card_id);
                break;
            }
        }
    }
});

function createBookCard(book) {
    const book_card = document.createElement('div');
    const book_title = document.createElement('h4');
    const book_author = document.createElement('p');
    const book_pages = document.createElement('p');

    const read_label = document.createElement('label');
    const read_btn = document.createElement('button');
    const remove_btn = document.createElement('button');

    const remove_icon = document.createElement('img');
    remove_icon.setAttribute('src', 'images/remove.svg');
    remove_icon.setAttribute('alt', 'remove button');

    book_card.classList.add('book');
    book_card.id = book.id;

    book_title.textContent = book.title;
    book_author.textContent = `By ${book.author}`;
    book_pages.textContent = `${book.pages} pages`;
    
    read_label.textContent = "Read?";
    read_btn.textContent = book.isRead ? "Yes" : "No";
    read_btn.classList.add("read");
    remove_btn.classList.add("remove");
    remove_btn.appendChild(remove_icon);

    read_label.setAttribute('for', `read${book.id}`);
    read_btn.id = `read${book.id}`;
    read_label.appendChild(read_btn);
    
    book_card.appendChild(book_title);
    book_card.appendChild(book_author);
    book_card.appendChild(book_pages);
    book_card.appendChild(read_label);
    book_card.appendChild(remove_btn);

    return book_card;
}

function displayBook () {
    const main = document.querySelector('main');

    for(let book of myLibrary) {
        let book_card = createBookCard(book);
        main.appendChild(book_card);
    }
}

// dialog
dialog_show.addEventListener('click', () => {
    dialog.showModal();
});

dialog_close.addEventListener('click', () => {
    dialog.close();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const main = document.querySelector('main');
    const formData = new FormData(form);
    const new_title = formData.get('title');
    const new_author = formData.get('author');
    const new_pages = formData.get('pages');
    const new_isRead = 
        formData.get('isRead') === 'yes'? true : false;

    console.log("Book data obtained");

    addBookToLibrary(new_title, new_author, new_pages, new_isRead);
    dialog.close();
    let book_card = createBookCard(myLibrary[myLibrary.length - 1]);
    main.appendChild(book_card);
});

// code
const myLibrary = [];

function Book (title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
};

Book.prototype.getInfo = function () {
    let read_statement = "";
    if(this.isRead===true) {
        read_statement = "have been read!";
    }
    else {
        read_statement = "not read yet!";
    }
    
    let final_statement = `${this.title} by ${this.author}, ${this.pages} pages, ${read_statement}`;
    
    return final_statement;
};

Book.prototype.readToggle = function (id) {
    let target_book = null;
    let target_book_idx = 0;
    for(let i=0; i<myLibrary.length; i++) {
        if(id === myLibrary[i].id) {
            target_book = myLibrary[i];
            target_book_idx = i;
            break;
        }
    }
    target_book.isRead = target_book.isRead ? false : true;
    console.log("Toggled", `${target_book.getInfo()}`);
}

function addBookToLibrary(title, author, pages, isRead) {
    let new_book = new Book(title, author, pages, isRead, crypto.randomUUID());
    myLibrary.push(new_book);
}


function removeBookFromLibrary(id) {
    let target_book = null;
    let target_book_idx = 0;
    for(let i=0; i<myLibrary.length; i++) {
        if(id === myLibrary[i].id) {
            target_book = myLibrary[i];
            target_book_idx = i;
            break;
        }
    }
    if(target_book === null) {
        console.log("Book doesn't exist.");
        return;
    }
    let info = myLibrary[target_book_idx].getInfo();
    console.log(`Removed book : ${info}`);
    myLibrary.splice(target_book_idx, 1);
    return;
}

addBookToLibrary("a", "b", 12, true);
addBookToLibrary("c", "d", 23, false);
addBookToLibrary("e", "f", 74, true);


displayBook();  
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
    
    console.log(final_statement);
    return;
};

function addBookToLibrary(title, author, pages, isRead, id) {
    let new_book = new Book(title, author, pages, isRead, id);
    myLibrary.push(new_book);
}

addBookToLibrary("a", "b", 12, true, crypto.randomUUID());
addBookToLibrary("c", "d", 23, false, crypto.randomUUID());
addBookToLibrary("e", "f", 74, true, crypto.randomUUID());

for(let i=0; i<myLibrary.length; i++) {
    console.log(myLibrary[i].getInfo());
    console.log(myLibrary[i].id);
}
const myLibrary = [];

function Book (title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
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

function addBookToLibrary(title, author, pages, isRead) {
    let new_book = new Book(title, author, pages, isRead);
    myLibrary.push(new_book);
}

addBookToLibrary("a", "b", 12, true);
console.log(myLibrary[0].getInfo());
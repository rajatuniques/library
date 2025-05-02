function Book (title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.getInto = function () {
        let read_statement = "";
        if(isRead===true) {
            read_statement = "have been read!";
        }
        else {
            read_statement = "not read yet!";
        }
        
        final_statement = `${title} by ${author}, ${pages}, ${read_statement}`;
        
        console.log(final_statement);
        return;
    };
};
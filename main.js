
let dialog = document.querySelector("dialog");
let addBtn = document.querySelector(".add");
addBtn.addEventListener("click", () => {
    dialog.showModal();
});

let myLibrary = []; //to store all the book objects

function Book(title, author, totalPages, readStatus) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readStatus = readStatus;
}

//Take user’s input and store the new book objects into an array
//Submit btn event create new obj take all values in parameters & then push to array
function addBookToLibrary() {
    let bookTitle = document.getElementById("book_title").value;
    let bookAuthor = document.getElementById("book_author").value;
    let bookPages = document.getElementById("total_pages").value;
    let bookStatus = document.getElementById("read_status").checked ? "Read" : "Not Read";

    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    myLibrary.push(newBook);   

    displayBookTable();
}

let submitBtn = document.querySelector("dialog form");
submitBtn.addEventListener('submit', addBookToLibrary);

let tbody = document.querySelector("tbody");

// loop through the array then display on browser
function displayBookTable() {

    tbody.innerHTML = ""; //clearing the whole table & then display the whole list of books again

    for (const [index, book] of myLibrary.entries()) {
        tbody.innerHTML += 
        `<tr data-index="${index}"> 
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.totalPages}</td>
            <td><button>${book.readStatus}</button></td>
            <td><i class="fa-solid fa-trash-can"></i></td>
        </tr>`;
    }

    deleteBookFromTable();
    
    changeStatusInTable();
}


function deleteBookFromTable() {
    let delBtnArr = Array.from(document.getElementsByClassName("fa-trash-can"));

    delBtnArr.forEach( (delBtn) => {
        delBtn.addEventListener('click', (e) => {

            let tr = e.target.parentElement.parentElement;
            tbody.removeChild(tr);

            for(let i=0; i<myLibrary.length; i++) {
                if(i === +(tr.dataset.index)) {
                    myLibrary.splice(i,1);
                }
            }

        } )
    });
}

function changeStatusInTable() {
    let statusBtnArr = Array.from(document.querySelectorAll("tr td:nth-child(4) button"));

    statusBtnArr.forEach( (statusBtn) => {
        statusBtn.addEventListener('click', (e) => {
            
            let tr = e.target.parentElement.parentElement;
            if(e.target.textContent === "Read") {
                e.target.textContent = "Not Read";

                for (let i=0; i<myLibrary.length; i++) {
                    if(i === +(tr.dataset.index)) {
                        myLibrary[i].readStatus = "Not Read"
                    }                
                }

            } 
            else {
                e.target.textContent ="Read";

                for (let i=0; i<myLibrary.length; i++) {
                    if(i === +(tr.dataset.index)) {
                        myLibrary[i].readStatus = "Read";
                    }                
                }

            }


        });
    } )
}


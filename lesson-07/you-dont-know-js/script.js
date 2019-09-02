'use strict';

function addId() {    
    let books = document.querySelectorAll('.book');
    books.forEach(function(item, i, arr) {
        let title = item.firstElementChild;
        let titleLink = title.firstElementChild.textContent.trim();
        let bookNumber = titleLink[6];

        item.setAttribute('id','book_'+bookNumber);
    });
}

// function booksSort() {
//     let books = document.querySelectorAll('.book');     

//     function sortById(arr) {
//         arr.sort(function(a, b) {
//             let firstBook = a.getAttribute('id');
//             let nextBook = b.getAttribute('id');
//             return (firstBook > nextBook) ? 1 : -1;
//         });
//     }

//     sortById(books);
// }
// booksSort();

function changeBackground() {
    let fonContainer = document.body;
    fonContainer.setAttribute('style','background: url(./image/you-dont-know-js.jpg);')
}

function changeTitle(id) {
    let book = document.querySelector('#book_'+id);
    let title = book.firstElementChild;
    let titleLink = title.firstElementChild;
    titleLink.textContent = "Книга 3. this и Прототипы Объектов";
}

function removeAdv() {
    let adv = document.querySelector('.adv');
    adv.remove();
}

function addChapter() {
    let list = document.querySelector('#book_6');
    list = list.childNodes[3];
    let li = list.childNodes[17];  
    let liClone = li.cloneNode(true);
    liClone.textContent = "Глава 8: За пределами ES6";  
    list.appendChild(liClone);
    list.insertBefore(list.childNodes[21],list.childNodes[19]); //вот этот момент не поняла, потому что выводится node list - text, li, text, li
    console.log(list.childNodes);
}

addId(); //добавить id
changeBackground(); //заменить фон
changeTitle(3); //заменить текст заголовка
removeAdv(); //удалить рекламу
addChapter(); //добавить главу

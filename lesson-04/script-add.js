'use strict';



const getString = function(str) {
    if (typeof str != 'string') {
        console.log('Это не строка, вводите буквы');
        let newstr = prompt('Это не строка, вводите буквы: '); //тут подмухлевала, конечно
        stringWork(newstr);
    } else {    
        stringWork(str);
    }
}

const stringWork = function(str) {
    let newstring = str.trim();   
    console.log('str1: ', newstring);     
    if (newstring.length > 30) {
        newstring = newstring.slice(0, 8) + '...';
        console.log('str2: ', newstring);
    }
}


getString(12345);
// getString('     Строка длинная, с пробелами. Очень длинная.     ');
// getString('Строченька');
let num = 266219,
    symbols,
    number,
    result = 1;

symbols = num.toString();                        //привели к строке
symbols = symbols.split('');                     //разбили строку на массив

for(let i=0; i<symbols.length; i++){
    number = Number(symbols[i]);                 //привели к числу
    result = result * number;
}

console.log('Результат: ', result);              // результат

let num = 266219,
    symbols,
    number,
    result = 1;

symbols = num.toString();                        //привели к строке
symbols = symbols.split('');                     //разбили строку на массив

for (let i=0; i<symbols.length; i++){
    number = Number(symbols[i]);                 //привели к числу
    result = result * number;
}

console.log('Результат: ', result);              // результат


const a = result;
for (let i=1; i<3; i++){
    result = a * result;
}
console.log('Результат в степени: ', result);

let sliceStr = result.toString();
sliceStr = sliceStr.slice(0,2);
console.log('Первые два числа: ', sliceStr);

'use strict';

let money,
    costs,
    deposit,
    quest1,
    request1,
    quest2,
    request2,
    budgetMonth,
    budgetDay,
    mission,
    times;



let start = function() {
    // money = prompt('Ваш месячный доход, руб?*',50000);
    // while(isNaN(money) || money === '' || money === null) {
    //     money = prompt('Ваш месячный доход, руб?**',50000);
    // }

    do {
        money = prompt('Ваш месячный доход, руб?*',50000);
    } while (isNaN(money) || money === '' || money === null);

}



start();



mission = +prompt('Сколько хотите накопить, руб?',100000);


const getExpensesMonth = function() {

    let sum = 0;

    for(let i = 0; i < 2; i++) {

        if(i===0) {
            quest1 = prompt('Введите обязательную статью расходов','Квартплата');
        }
        if(i===1) {
            request1 = prompt('Введите обязательную статью расходов','Бензин');
        }

        do {
            sum += Number(prompt('Сколько на это потребуется?',1000));
        } while(isNaN(sum) || sum === '' || sum === null)        

    } 
    console.log('getExpensesMonth: ', sum);
    return sum;
    
}



const  getAccumulatedMonth = function(a,b) {
    let budgetMonth = a - b;
    return budgetMonth;
}

const getTargetMonth = function(a,b) {
    let targetMonth = Math.ceil(a/b);
    if(targetMonth < 0){
        return targetMonth = 'Цель не будет достигнута';
    }
    return targetMonth;
}

let expensesMonth = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
let targetMonth = getTargetMonth(mission, accumulatedMonth);

console.log('Сумма всех доходов за месяц - ', money);
console.log('Сумма всех расходов за месяц - ', expensesMonth);
console.log('Накопления за месяц - ', accumulatedMonth);
console.log('Нужную сумму вы накопите через - ' + targetMonth + ' месяцев');
 
let getStatusIncome = function () {
    if (budgetDay > 800) {
        return('Высокий уровень дохода');
    } else if (budgetDay > 300 && budgetDay <=800) {
        return('Средний уровень дохода');
    } else if (budgetDay > 0 && budgetDay <= 300) {
        return('Низкий уровень дохода');
    } else {
        return('Что то пошло не так');
    }
};
console.log(getStatusIncome());

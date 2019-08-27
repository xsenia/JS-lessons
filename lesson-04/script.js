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

money = +prompt('Ваш месячный доход, руб?',5000);

// costs = prompt('Перечислите возможные расходы за рассчитываемый период, через запятую');

// deposit = confirm('Есть ли у вас депозит в банке?');

// console.log(typeof money);
// console.log(typeof costs);
// console.log(typeof deposit);

quest1 = +prompt('Какие обязательные ежемесячные расходы у вас есть, руб?',100);
//console.log('Какие обязательные ежемесячные расходы у вас есть: ', quest1);


if (quest1 !== null) {
    request1 = +prompt('Какие обязательные ежемесячные расходы у вас есть, руб?',200);
    //console.log('Какие обязательные ежемесячные расходы у вас есть, еще раз: ', request1);
}

// quest2 = prompt('Во сколько это обойдется, руб?');
// console.log('Во сколько это обойдется: ', quest2);

// if (quest2 !== null) {
//     request2 = prompt('Во сколько это обойдется, руб?');
//     console.log('Во сколько это обойдется, еще раз: ', request2);
// }

// if (money !== null && quest1 !== null && request1) {
//     budgetMonth = money - quest1 - request1;
//     console.log('Месячный бюджет: ', budgetMonth);
// }


mission = +prompt('Сколько хотите накопить, руб?',10000);
//times = Math.ceil(mission / budgetMonth);

// console.log('Такую сумму вы накопите за ' + times + ' месяцев');

// budgetDay = Math.ceil(budgetMonth/30);
// budgetDay = 200;

// console.log('Ваш дневной бюджет: ', budgetDay);

// if (budgetDay > 800) {
//     console.log('Высокий уровень дохода');
// } else if (budgetDay > 300 && budgetDay <=800) {
//     console.log('Средний уровень дохода');
// } else if (budgetDay > 0 && budgetDay <= 300) {
//     console.log('Низкий уровень дохода');
// } else {
//     console.log('Что то пошло не так');
// }


const getExpensesMonth = function(a,b) {
    let costs = a + b;
    return costs;
}

const  getAccumulatedMonth = function(a,b) {
    let budgetMonth = a - b;
    return budgetMonth;
}

const getTargetMonth = function(a,b) {
    let targetMonth = Math.ceil(a/b);
    return targetMonth;
}

let expensesMonth = getExpensesMonth(quest1, request1);
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
let targetMonth = getTargetMonth(mission, accumulatedMonth);

console.log('Сумма всех доходов за месяц - ', money);
console.log('Сумма всех расходов за месяц - ', expensesMonth);
console.log('Накопления за месяц - ', accumulatedMonth);
console.log('Нужную сумму вы накопите через - ' + targetMonth + ' месяцев');
 







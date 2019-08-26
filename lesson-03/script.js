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

money = prompt('Ваш месячный доход, руб?');

costs = prompt('Перечислите возможные расходы за рассчитываемый период, через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

console.log(typeof money);
console.log(typeof costs);
console.log(typeof deposit);

quest1 = prompt('Какие обязательные ежемесячные расходы у вас есть, руб?');
console.log('Какие обязательные ежемесячные расходы у вас есть: ', quest1);


if (quest1 !== null) {
    request1 = prompt('Какие обязательные ежемесячные расходы у вас есть, руб?');
    console.log('Какие обязательные ежемесячные расходы у вас есть, еще раз: ', request1);
}

quest2 = prompt('Во сколько это обойдется, руб?');
console.log('Во сколько это обойдется: ', quest2);

if (quest2 !== null) {
    request2 = prompt('Во сколько это обойдется, руб?');
    console.log('Во сколько это обойдется, еще раз: ', request2);
}

if (money !== null && quest1 !== null && request1) {
    budgetMonth = money - quest1 - request1;
    console.log('Месячный бюджет: ', budgetMonth);
}


mission = prompt('Сколько хотите накопить, руб?');
times = Math.ceil(mission / budgetMonth);

console.log('Такую сумму вы накопите за ' + times + ' месяцев');

budgetDay = Math.ceil(budgetMonth/30);
budgetDay = 200;

console.log('Ваш дневной бюджет: ', budgetDay);

if (budgetDay > 800) {
    console.log('Высокий уровень дохода');
} else if (budgetDay > 300 && budgetDay <=800) {
    console.log('Средний уровень дохода');
} else if (budgetDay > 0 && budgetDay <= 300) {
    console.log('Низкий уровень дохода');
} else {
    console.log('Что то пошло не так');
}



 
 






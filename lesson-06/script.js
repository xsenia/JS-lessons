'use strict';
let money;

let start = function() {   
    do {
        money = prompt('Ваш месячный доход, руб?*',50000);
    } while (isNaN(money) || money === '' || money === null);
}
start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budgetDay: 0, 
    budgetMonth: 0, 
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные доходы через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('У вас есть депозит?');
    },
    getExpensesMonth: function() {
        let expenses1, expenses2, sum = 0, question;
    
        for(let i = 0; i < 2; i++) {
    
            if(i===0) {
                expenses1 = prompt('Введите обязательную статью расходов','Квартплата');
            } else {
                expenses2 = prompt('Введите обязательную статью расходов','Бензин');
            }
    
            do{
                question = prompt('Во сколько это обойдется?',1000); 
            } while(isNaN(question) || question === '' || question === null);
    
            sum += +question;
        } 
        
        return sum;    
    },
    getAccumulatedMonth: function() {
        return money - expensesMonth;
    },
    getTargetMonth: function() {    
        return appData.mission/appData.getAccumulatedMonth;
    },
    getStatusIncome: function () {
        appData.budgetDay = Math.ceil(appData.getAccumulatedMonth/30);
        if (appData.budgetDay > 800) {
            return('Высокий уровень дохода');
        } else if (appData.budgetDay > 300 && appData.budgetDay <=800) {
            return('Средний уровень дохода');
        } else if (appData.budgetDay > 0 && appData.budgetDay <= 300) {
            return('Низкий уровень дохода');
        } else {
            return('Что то пошло не так');
        }
    }
};


let expensesMonth = appData.getExpensesMonth();

console.log('Расходы за месяц: ', expensesMonth);



//appData.budgetDay = Math.ceil(appData.getAccumulatedMonth/30);


if(appData.getTargetMonth()>0){
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
    console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());


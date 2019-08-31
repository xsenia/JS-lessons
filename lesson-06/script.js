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
    question1: 0, 
    question2: 0,
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

        for(let i = 0; i < 2; i++) {
            let requiredExpenses = prompt('Введите обязательную статью расходов','Квартплата');
            let requiredAnswer;
            do{
                requiredAnswer = prompt('Во сколько это обойдется?',1000); 
            } while (isNaN(requiredAnswer) || requiredAnswer === '' || requiredAnswer === null);

            appData.expenses[requiredExpenses] = requiredAnswer;
        }

    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }    
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

appData.asking();
appData.getExpensesMonth();
//appData.getBudget();


let expensesMonth = appData.getExpensesMonth();

console.log('Расходы за месяц: ', appData.expensesMonth);



//appData.budgetDay = Math.ceil(appData.getAccumulatedMonth/30);


if(appData.getTargetMonth()>0){
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
    console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

for(let key in appData) {
    console.log('Данные программы: ' + key + ' - ' + appData[key]);
}


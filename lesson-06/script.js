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
    expenses: {
        'Введите обязательную статью расходов': appData.question1,
        'Во сколько это обойдется?': appData.question2
    },
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

        // for(let i = 0; i < 2; i++) {
    
        //     if(i===0) {
        //         prompt('Введите обязательную статью расходов','Квартплата');
        //         do{
        //             appData.question1 = prompt('Во сколько это обойдется?',1000); 
        //         } while(isNaN(appData.question1) || appData.question1 === '' || appData.question1 === null);
        //     } else {
        //         prompt('Введите обязательную статью расходов','Бензин');
        //         do{
        //             appData.question2 = prompt('Во сколько это обойдется?',1000); 
        //         } while(isNaN(appData.question2) || appData.question2 === '' || appData.question2 === null);
        //     } 
           
        // } 
    },
    getExpensesMonth: function() {
        // let sum = 0, question;   
        
        // sum += +question;
        // return sum;    
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


//let expensesMonth = appData.getExpensesMonth();

//console.log('Расходы за месяц: ', expensesMonth);



//appData.budgetDay = Math.ceil(appData.getAccumulatedMonth/30);


if(appData.getTargetMonth()>0){
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
    console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());


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
    persentDeposite: 0,
    moneyDeposite: 0,
    mission: 50000,
    period: 3,
    budgetDay: 0, 
    budgetMonth: 0, 
    expensesMonth: 0,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            do{
                itemIncome = prompt('Какой у вас дополнительный заработок?','Таксую'); 
            } while (itemIncome === null || itemIncome.length === 0 || !isNaN(itemIncome));

            let cachIncome;
            do{
                cachIncome = prompt('Сколько вы на этом зарабатываете?',10000); 
            } while (isNaN(cachIncome) || cachIncome === '' || cachIncome === null);

            appData.income[itemIncome] = cachIncome;
        }

        let addExpenses;
        do{
            addExpenses = prompt('Перечислите возможные доходы через запятую'); 
        } while (addExpenses === null || addExpenses.length === 0 || !isNaN(addExpenses));

        appData.addExpenses = addExpenses.toLowerCase().split(',');

        appData.deposit = confirm('У вас есть депозит?');

        for(let i = 0; i < 2; i++) {
            let requiredExpenses;
            do{
                requiredExpenses = prompt('Введите обязательную статью расходов', 'трата №' + (i+1));
            } while (requiredExpenses === null || requiredExpenses.length === 0 || !isNaN(requiredExpenses));

            let requiredAnswer;
            do{
                requiredAnswer = prompt('Во сколько это обойдется?',1000); 
            } while (isNaN(requiredAnswer) || requiredAnswer === '' || requiredAnswer === null);            

            appData.expenses[requiredExpenses] = requiredAnswer;
        }
        
        console.log('appData.expenses: ', appData.expenses);

    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }    
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth/30);
    },
    getTargetMonth: function() {    
        return appData.mission/appData.getAccumulatedMonth;
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 800) {
            return('Высокий уровень дохода');
        } else if (appData.budgetDay > 300 && appData.budgetDay <=800) {
            return('Средний уровень дохода');
        } else if (appData.budgetDay > 0 && appData.budgetDay <= 300) {
            return('Низкий уровень дохода');
        } else {
            return('Что то пошло не так');
        }
    },
    getInfoDeposite: function() {
        if(appData.deposite){            
            do{
                appData.persentDeposite = prompt('Какой годовой пороцент?','10');
            } while (appData.persentDeposite === null || appData.persentDeposite.length === 0 || !isNaN(appData.persentDeposite));

            do{
                appData.moneyDeposite = prompt('Какая сумма заложена?', 10000)
            } while (isNaN(appData.moneyDeposite) || appData.moneyDeposite === '' || appData.moneyDeposite === null);

            
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);


if(appData.getTargetMonth()>0){
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
    console.log('Цель не будет достигнута');
}

//выведет уровень дохода
console.log(appData.getStatusIncome());

for(let key in appData) {
    console.log('Данные программы: ' + key + ' - ' + appData[key]);
}


let addExpensesString = '';
for (let i=0; i<appData.addExpenses.length; i++) {
    let newAddExpenses = appData.addExpenses[i].trim(); 
    newAddExpenses = newAddExpenses[0].toUpperCase() + newAddExpenses.slice(1); 
    addExpensesString += newAddExpenses + ', ';    
}

console.log('addExpensesString: ', addExpensesString);





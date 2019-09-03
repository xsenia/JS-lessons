'use strict';

let btnStart =                  document.getElementById('start');
let salaryAmount =              document.querySelector('.salary-amount');
let incomeTitle =               document.querySelector('.income-title');
let incomeAmount =              document.querySelector('.income-amount');
let additionalIncomeItems =     document.querySelectorAll('.additional_income-item');
let additionalIncomeItem1 =     additionalIncomeItems[0];
let additionalIncomeItem2 =     additionalIncomeItems[1];
let arrPlus =                   document.querySelectorAll('.btn_plus');
let incomePlus =                arrPlus[0];
let expensesPlus =              arrPlus[1];
let additionalIncomeTitle =     document.querySelector('.additional_income-title');
let additionalIncomeItem =      document.querySelectorAll('.additional_income-item');
let expensesTitle =             document.querySelector('.expenses-title');
let expensesItems =             document.querySelectorAll('.expenses-items');
let additionalExpensesItemd =   document.querySelector('.additional_expenses-item');
let depositCheck =              document.querySelector('#deposit-check');
let depositAmount =             document.querySelector('.deposit-amount');
let depositPercent =            document.querySelector('.deposit-percent');
let targetAmount =              document.querySelector('.target-amount');
let periodSelect =              document.querySelector('.period-select');
let budgetMonthValue =          document.querySelector('.budget_month-value');
let budgetDayValue =            document.querySelector('.budget_day-value');
let expensesMonthValue =        document.querySelector('.expenses_month-value');
let additionalIncomeValue =     document.querySelector('.additional_income-value');
let additionalExpensesValue =   document.querySelector('.additional_expenses-value');
let incomePeriodValue =         document.querySelector('.income_period-value');
let targetMonthValue =          document.querySelector('.target_month-value');

// console.log(btnStart, salaryAmount, incomeTitle, incomeAmount, additionalIncomeItems, additionalIncomeItem1, additionalIncomeItem1, arrPlus, incomePlus, expensePlus, additionalIncomeTitle, additionalIncomeItem, expensesTitle, expensesAmount, additionalExpensesItemd, depositCheck, depositAmount, depositPercent, targetAmount, periodSelect, budgetMonthValue, budgetDayValue, expensesMonthValue, additionalIncomeValue, additionalExpensesValue,incomePeriodValue, targetMonthValue);

let appData = {
    budget: 0,
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
    start: function() { 

        if(salaryAmount.value === '') {
            alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
            return;
        }

        appData.budget = salaryAmount.value;

        appData.getExpenses();
        // appData.asking();
        // appData.getExpensesMonth();
        // appData.getBudget();
    },
    addExpensesBlock: function() {        
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            console.log('item: ', item);
            let itemExpanses = item.querySelector('.expenses-title').value;
            let cashExpanses = item.querySelector('.expenses-amount').value;
            if(itemExpanses !== '' && cashExpanses !== '') {
                appData.expenses[itemExpanses] = cashExpanses;
            }
        });
    },
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

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

// if(appData.getTargetMonth()>0){
//     console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
// } else {
//     console.log('Цель не будет достигнута');
// }


let addExpensesString = '';
for (let i=0; i<appData.addExpenses.length; i++) {
    let newAddExpenses = appData.addExpenses[i].trim(); 
    newAddExpenses = newAddExpenses[0].toUpperCase() + newAddExpenses.slice(1); 
    addExpensesString += newAddExpenses + ', ';    
}


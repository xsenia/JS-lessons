'use strict';

let btnStart =                  document.getElementById('start');
let btnCncel =                  document.getElementById('cancel');
let salaryAmount =              document.querySelector('.salary-amount');
let incomeTitle =               document.querySelector('.income-title');
let incomeAmount =              document.querySelector('.income-amount');
let arrPlus =                   document.querySelectorAll('.btn_plus');
let incomePlus =                arrPlus[0];
let expensesPlus =              arrPlus[1];
let additionalIncomeTitle =     document.querySelector('.additional_income-title');
let additionalIncomeItem =      document.querySelectorAll('.additional_income-item');
let expensesTitle =             document.querySelector('.expenses-title');
let expensesItems =             document.querySelectorAll('.expenses-items');
let additionalExpensesItem =    document.querySelector('.additional_expenses-item');
let depositCheck =              document.querySelector('#deposit-check');
let depositAmount =             document.querySelector('.deposit-amount');
let depositPercent =            document.querySelector('.deposit-percent');
let targetAmount =              document.querySelector('.target-amount');
let budgetMonthValue =          document.querySelector('.budget_month-value');
let budgetDayValue =            document.querySelector('.budget_day-value');
let expensesMonthValue =        document.querySelector('.expenses_month-value');
let additionalIncomeValue =     document.querySelector('.additional_income-value');
let additionalExpensesValue =   document.querySelector('.additional_expenses-value');
let incomePeriodValue =         document.querySelector('.income_period-value');
let targetMonthValue =          document.querySelector('.target_month-value');
let incomeItems =               document.querySelectorAll('.income-items');
let periodAmount =              document.querySelector('.period-amount');
let periodSelect =              document.querySelector('.period-select');
let dataInputs =                document.querySelectorAll('.data input[type=text]');


let appData = {
    budget: 0,
    income: {},
    incomeMonth: 0, 
    addIncome: [], 
    question1: 0, 
    question2: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    persentDeposite: 0,
    moneyDeposite: 0,
    budgetDay: 0, 
    budgetMonth: 0, 
    expensesMonth: 0,
    start: function() { 

        if(salaryAmount.value === null || salaryAmount.value === '' || isNaN(salaryAmount) ) {            
            btnStart.addEventListener('mousemove',function(event) {
                btnStart.setAttribute('disabled', true);
                //event.preventDefault();
            });
        }

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();        
        appData.getAddExpenses();
        appData.getAddIncome();        
        appData.getBudget();        

        appData.showResult();

        //appData.getResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
    },
    getResult: function() {        
        dataInputs.forEach(function(item){
            item.setAttribute('disabled', true);
        });
        btnStart.style.display = 'none';
        btnCncel.style.display = 'block';

    },
    addExpensesBlock: function() {        
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {        
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpanses = item.querySelector('.expenses-title').value;
            let cashExpanses = item.querySelector('.expenses-amount').value;
            if(itemExpanses !== '' && cashExpanses !== '') {
                appData.expenses[itemExpanses] = cashExpanses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }            
        });
        for (let key in appData.income) {
           appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    setPeriod: function() {
        let periodValue = periodSelect.value;
        periodAmount.innerHTML = periodValue;
        return periodValue;
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }    
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth/30);
    },
    getTargetMonth: function() {    
        return targetAmount.value/appData.budgetMonth;
    },
    // getStatusIncome: function () {
    //     if (appData.budgetDay > 800) {
    //         return('Высокий уровень дохода');
    //     } else if (appData.budgetDay > 300 && appData.budgetDay <=800) {
    //         return('Средний уровень дохода');
    //     } else if (appData.budgetDay > 0 && appData.budgetDay <= 300) {
    //         return('Низкий уровень дохода');
    //     } else {
    //         return('Что то пошло не так');
    //     }
    // },
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
    calcPeriod: function() {
        return appData.budgetMonth * appData.setPeriod();
    }
};

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.setPeriod);


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


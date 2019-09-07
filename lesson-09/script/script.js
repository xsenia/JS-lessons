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
    enabled: function() {
        if (salaryAmount.value !== '') {
            btnStart.removeAttribute('disabled');
        }
    },
    start: function() { 

        if (salaryAmount.value === '') {
            btnStart.setAttribute('disabled',true);
        }

        dataInputs.forEach(function(item){
            item.setAttribute('disabled', true);
        });
        arrPlus.forEach(function(item){
            item.setAttribute('disabled', true);
        });
        btnStart.style.display = 'none';
        btnCncel.style.display = 'block';

        
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();        
        this.getAddExpenses();
        this.getAddIncome();        
        this.getBudget();
        this.showResult();
    },
    reset: function() {
        let dataInputs = document.querySelectorAll('.data input[type = text]'),
            resultInputs = document.querySelectorAll('.result input[type = text]');

        dataInputs.forEach(function(item){
            item.value = '';            
            item.removeAttribute('disabled');           
        });
        resultInputs.forEach(function(item){
            item.value = '';            
        });
        arrPlus.forEach(function(item){
            item.removeAttribute('disabled');
        });

        let periodValue = periodSelect.value;
        periodValue = 0;
        periodAmount.innerHTML = periodValue;

        for(let i=1; i<incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            incomePlus.style.display = 'block';
        }
        for(let i=1; i<expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            expensesPlus.style.display = 'block';
        }

        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0; 
        this.addIncome = []; 
        this.question1 = 0; 
        this.question2 = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.persentDeposite = 0;
        this.moneyDeposite = 0;
        this.budgetDay = 0; 
        this.budgetMonth = 0; 
        this.expensesMonth = 0;

        btnCncel.style.display = 'none';
        btnStart.style.display = 'block';
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
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
        for (let key in this.income) {
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
        incomePeriodValue.value = periodValue*appData.budgetMonth;
        return periodValue;
    },
    getExpensesMonth: function() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }    
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth/30);
    },
    getTargetMonth: function() {    
        return targetAmount.value/this.budgetMonth;
    },
    // getStatusIncome: function () {
    //     if (this.budgetDay > 800) {
    //         return('Высокий уровень дохода');
    //     } else if (this.budgetDay > 300 && this.budgetDay <=800) {
    //         return('Средний уровень дохода');
    //     } else if (this.budgetDay > 0 && this.budgetDay <= 300) {
    //         return('Низкий уровень дохода');
    //     } else {
    //         return('Что то пошло не так');
    //     }
    // },
    getInfoDeposite: function() {
        if(this.deposite){            
            do{
                this.persentDeposite = prompt('Какой годовой пороцент?','10');
            } while (this.persentDeposite === null || this.persentDeposite.length === 0 || !isNaN(this.persentDeposite));

            do{
                this.moneyDeposite = prompt('Какая сумма заложена?', 10000)
            } while (isNaN(this.moneyDeposite) || this.moneyDeposite === '' || this.moneyDeposite === null);

            
        }
    },
    calcPeriod: function() {
        return this.budgetMonth * this.setPeriod();
    }
};

btnStart.addEventListener('click', appData.start.bind(appData));
btnCncel.addEventListener('click', appData.reset.bind(appData));


expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.setPeriod);
salaryAmount.addEventListener('keyup', appData.enabled)


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


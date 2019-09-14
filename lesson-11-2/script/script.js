'use strict';

const btnStart =                  document.getElementById('start');
const btnCncel =                  document.getElementById('cancel');
const salaryAmount =              document.querySelector('.salary-amount');

const incomeItems =               document.querySelectorAll('.income-items');
const incomeTitle =               document.querySelector('.income-title');
const incomeAmount =              document.querySelector('.income-amount');

const arrPlus =                   document.querySelectorAll('.btn_plus');
const incomePlus =                arrPlus[0];
const expensesPlus =              arrPlus[1];


const additionalIncomeTitle =     document.querySelector('.additional_income-title');
const expensesTitle =             document.querySelector('.expenses-title');
const expensesItems =             document.querySelectorAll('.expenses-items');
const additionalIncomeItem =      document.querySelectorAll('.additional_income-item');
const additionalExpensesItem =    document.querySelector('.additional_expenses-item');
const depositCheck =              document.querySelector('#deposit-check');
const depositAmount =             document.querySelector('.deposit-amount');
const depositPercent =            document.querySelector('.deposit-percent');
const targetAmount =              document.querySelector('.target-amount');
const budgetMonthValue =          document.querySelector('.budget_month-value');
const budgetDayValue =            document.querySelector('.budget_day-value');
const expensesMonthValue =        document.querySelector('.expenses_month-value');
const additionalIncomeValue =     document.querySelector('.additional_income-value');
const additionalExpensesValue =   document.querySelector('.additional_expenses-value');
const incomePeriodValue =         document.querySelector('.income_period-value');
const targetMonthValue =          document.querySelector('.target_month-value');
const periodAmount =              document.querySelector('.period-amount');
const periodSelect =              document.querySelector('.period-select');
const dataInputs =                document.querySelectorAll('.data input[type=text]');
const depositBank =               document.querySelector('.deposit-bank');


class AppData {
    constructor (budget = 0, income = {}, incomeMonth = 0,  addIncome = [],  question1 = 0,  question2 = 0, expenses = {}, addExpenses = [], deposit = false, persentDeposit = 0, moneyDeposit = 0, budgetDay = 0,  budgetMonth = 0,  expensesMonth = 0) {
        this.budget = budget;
        this.income = income;
        this.incomeMonth = incomeMonth; 
        this.addIncome = addIncome; 
        this.question1 = question1;
        this.question2 = question2; 
        this.expenses = expenses;
        this.addExpenses = addExpenses; 
        this.deposit = deposit;
        this.persentDeposit = persentDeposit;    
        this.moneyDeposit = moneyDeposit;    
        this.budgetDay = budgetDay;     
        this.budgetMonth = budgetMonth;     
        this.expensesMonth = expensesMonth;    
    }
    
    enabled = function() {
        if (salaryAmount.value !== '') {
            btnStart.removeAttribute('disabled');
        }
    }
    
    start = function() { 
    
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
        this.getInfoDeposit();     
        this.getBudget();
        this.showResult();
    }
    
    getAddExpenses = function() {
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }
    
    getAddIncome = function() {
        const _this = this;
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }
    
    reset = function() {
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
        this.persentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0; 
        this.budgetMonth = 0; 
        this.expensesMonth = 0;
    
        btnCncel.style.display = 'none';
        btnStart.style.display = 'block';
    }
    
    showResult = function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
    }
    
    
    addBlock = function(btnPlus,items,classItems) {        
        let cloneItems = items[0].cloneNode(true);    
        items[0].parentNode.insertBefore(cloneItems, btnPlus);
        items = document.querySelectorAll(classItems);
    
        if (items.length === 3) { 
            btnPlus.style.display = 'none';
        }
        cloneItems.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
    }
    
    
    
    getIncome = function () {
        const _this = this;
        console.log('incomeItems: ', incomeItems);
        
        incomeItems.forEach(function(item){            
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }            
        });
        for (let key in this.income) {
            _this.incomeMonth += +_this.income[key];
        }
    }   
    
    setPeriod = function() {
        let periodValue = periodSelect.value;
        periodAmount.innerHTML = periodValue;
        incomePeriodValue.value = periodValue * this.budgetMonth;
        return periodValue;
    }

    getExpenses = function() {
        const _this = this;
        expensesItems.forEach(function(item){
            let itemExpanses = item.querySelector('.expenses-title').value;
            let cashExpanses = item.querySelector('.expenses-amount').value;
            if(itemExpanses !== '' && cashExpanses !== '') {
                _this.expenses[itemExpanses] = cashExpanses;
            }
        });
    }
    
    getExpensesMonth = function() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }    
    }
    
    getBudget = function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit*this.persentDeposit)/12;   
        console.log('this.persentDeposit: ', this.persentDeposit);
        console.log('this.moneyDeposit: ', this.moneyDeposit);
        console.log('this.expensesMonth: ', this.expensesMonth);
        console.log('this.incomeMonth: ', this.incomeMonth);
        console.log('this.budget: ', this.budget);
        this.budgetDay = Math.ceil(this.budgetMonth/30);
    }
    
    getTargetMonth = function() {    
        return targetAmount.value/this.budgetMonth;
    }   

    
    getInfoDeposit = function() {
        if(this.deposit){  
            this.persentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    
    calcPeriod = function() {
        return this.budgetMonth * this.setPeriod();
    }
    
    eventListeners = function() {
        btnStart.addEventListener('click', this.start.bind(appData));
        btnCncel.addEventListener('click', this.reset.bind(appData));
    
        expensesPlus.addEventListener('click', () => { this.addBlock(expensesPlus,expensesItems,'.expenses-items')});
        incomePlus.addEventListener('click', () => { this.addBlock(incomePlus,incomeItems,'.income-items')});
    
        periodSelect.addEventListener('change', this.setPeriod);
        salaryAmount.addEventListener('keyup', this.enabled);

        depositCheck.addEventListener('change', function() {
            if(depositCheck.checked) {
                depositBank.style.display = "inline-block";
                depositAmount.style.display = "inline-block";
                appData.deposit = true;
                console.log('appData.deposit: ', appData.deposit);
        
                depositBank.addEventListener('change', function() {
                    let selectIndex = this.options[this.selectedIndex].value;
                    console.log('selectIndex: ', selectIndex);
                    if (selectIndex == 'other') {
                        depositPercent.style.display = "inline-block";
                        depositPercent.value = '';
                    } else {
                        depositPercent.style.display = "none";
                        depositPercent.value = selectIndex;
                    }
                });
            } else {
                depositBank.style.display = "none";
                depositAmount.style.display = "none";
                depositAmount.value = '';        
                appData.deposit = false;
                console.log('appData.deposit: ', appData.deposit);
            }
        });
    }

}








const appData = new AppData();
appData.eventListeners();



let addExpensesString = '';
for (let i=0; i<appData.addExpenses.length; i++) {
    let newAddExpenses = appData.addExpenses[i].trim(); 
    newAddExpenses = newAddExpenses[0].toUpperCase() + newAddExpenses.slice(1); 
    addExpensesString += newAddExpenses + ', ';    
}


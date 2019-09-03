'use strict';

let btn = document.getElementById('start');

let arrPlus = document.querySelectorAll('.btn_plus');

let incomeAdd = arrPlus[0];
let expensesAdd = arrPlus[1];

let check = document.querySelector('#deposit-check');

let inputAdd = document.querySelectorAll('.additional_income-item');

let inputResult = document.querySelectorAll('.result input');

let inputData = document.querySelectorAll('.data input');
console.log(inputData);

let salaryAmount            =  inputData[0];
let incomeTitle             =  inputData[1];
let incomeAmount            =  inputData[2];
let additionalIncomeItem    =  inputData[3];
let additionalIncomeItem2   =  inputData[4];
let expensesTitle           =  inputData[5];
let expensesAmount          =  inputData[6];
let additionalExpensesItemd =  inputData[7];
let depositAmount           =  inputData[9];
let depositPercent          =  inputData[10];
let targetAmount            =  inputData[11];
let periodSelect            =  inputData[12];

// console.log(salaryAmount,incomeTitle,incomeAmount,additionalIncomeItem,additionalIncomeItem2,expensesTitle,
//   expensesAmount,additionalExpensesItemd,depositAmount,depositPercent,targetAmount,periodSelect );



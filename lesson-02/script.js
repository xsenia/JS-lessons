let money = 100000,                          // любое число “Доход за месяц”,
    income = "такси",                        // строка с дополнительными доходом (например, фриланс или такси), 
    addExpenses = "бензин, ТО, аксессуары",  // строка с перечислением дополнительных расходов через запятую (минимум 3 значения), 
    deposit = true,                          // любое булевое значение,
    mission = 50000,                         // любое число (Какую сумму хотите накопить),
    period = 6,                              // число от 1 до 12
    budgetDay,                               // дневной бюджет
    modulo;                                  // остаток от деления


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(income.length);
console.log("Период " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");

budgetDay = money/30;
console.log('budgetDay: ', budgetDay);
console.log('остаток от деления: ', money % 30);
modulo = (money % 30) > 0 ? "Да, остаток есть" : "Нет, остатка нет";
console.log('modulo: ', modulo);

let str = addExpenses.toLowerCase();
console.log('Нижний регистр: ', str);
str = str.split(', ');
console.log('Массив: ', str);





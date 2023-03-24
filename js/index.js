'use strict';

let btnStart = document.getElementById('start'),
    budgetValue = document.querySelector('.budget-value'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


    expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

    let money, time;
    expensesBtn.disabled = true;
    optionalExpensesBtn.disabled = true;
    countBtn.disabled = true;

    btnStart.addEventListener('click', () => {
        time = prompt('Введите дату в формате YYYY-MM-DD');
        money = +prompt('Ваш бюджет на месяц?'); 
    
        while(isNaN(money) || money == '' || money == null){
            money = +prompt('Ваш бюджет на месяц?'); 
        }
        appData.budget = money;
        appData.timeData = time;
        budgetValue.textContent = money.toFixed();
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth()+1;
        dayValue.value = new Date(Date.parse(time)).getDate();
        
        expensesBtn.disabled = false;
        optionalExpensesBtn.disabled = false;
        countBtn.disabled = false;

  
    });

    expensesBtn.addEventListener('click', () =>{
        let sum = 0;
        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
        
                if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null // Проверка на отмену -typeof(a)) != null, если пользователь нажмет Отмена
                 && a != '' && b != '' && a.length < 50) {
                    console.log("done");
                    appData.expenses[a] = b;
                    sum += +b;
                 } else {
                    alert('Вы не заполнили обязательные поля');
                    i = i-1;
                 }
        }
        expensesValue.textContent = sum;

        for (let i = 0; i < expensesItem.length; i++) {
            expensesItem[i].value = '';
        }
    });

    optionalExpensesBtn.addEventListener('click', () => {
        for (let i = 0; i < optionalexpensesItem.length; i++) {
            let opt = optionalexpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalexpensesValue.textContent += appData.optionalExpenses[i] + " ";
            optionalexpensesItem[i].value = '';
        }
    });

    countBtn.addEventListener('click', () => {

        if (appData.budget != undefined) {
            appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
            daybudgetValue.textContent = appData.moneyPerDay;
    
            if (appData.moneyPerDay < 100) {
                levelValue.textContent = 'Минимальный уровень достатка';
            } else if( appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = 'Средний уровень достатка';
            } else if( appData.moneyPerDay > 2000) {
                levelValue.textContent = 'Высокий уровень достатка';
            } else {
                levelValue.textContent = 'Произошла ошибка';
            }
        } else {
            daybudgetValue.textContent = 'Произошла ошибка';
        }
    });

    incomeItem.addEventListener('input', () => {
        let items = incomeItem.value;
        if (isNaN(items) || items != '') {
            appData.income = items.split(',');
            incomeValue.textContent = appData.income;
        }
    });
    incomeItem.addEventListener('change', () => {
        incomeItem.value = '';
    });

    checkSavings.addEventListener('click', () => {
        if (appData.savings == true) {
            appData.savings = false;
        } else {
            appData.savings = true;
        }
    });

    sumValue.addEventListener('input', () => {
        if (appData.savings == true) {
            let sum = +sumValue.value;
            let percent = +percentValue.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1); //округление до 1 цифра после запятой
        }
    });

    percentValue.addEventListener('input', () => {
        if (appData.savings == true) {
            let sum = +sumValue.value;
            let percent = +percentValue.value;

            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1); //округление до 1 цифра после запятой
        }
    });

    const appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false
    };
    
    // for( let key in appData) {
    //     console.log('Наша программа включает в себя данные: ' + key + ':' + appData[key]);
        
    // }
    
    
    // let i = 0;
    // while ( i < 2) {
    //     let a = prompt('Введите обязательную статью расходов в этом месяце'),
    //         b = prompt('Во сколько обойдется?');
    //         // i = i + 1;//i++  -тут тоже можно записать
    //     if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null 
    //      && a != '' && b != '' && a.length < 50) {
    //         console.log("done");
    //         appData.expenses[a] = b;
         
    //      } else {
    //         alert("Вы не заполнили обязательные поля");
    //         i = i-1; //i--
    //      }
    //          i = i + 1;//i++
    // }
    
    
    // let i = 0;
    
    // do { 
    //     let a = prompt('Введите обязательную статью расходов в этом месяце'),
    //             b = prompt('Во сколько обойдется?');
    //         if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
    //          && a != '' && b != '' && a.length < 50) {
    //             console.log("done");
    //             appData.expenses[a] = b;
             
    //          } else {
    //             alert("Вы не заполнили обязательные поля");
    //             i = i-1; //i--
    //          }
    //              i = i + 1;//i++
        
    // } while ( i < 2);
    
    

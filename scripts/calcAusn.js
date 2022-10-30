import { debounceTimer, formatCurrency } from "./script.js";


// КАкулятор АУСН: 

const ausn = document.querySelector('.ausn');                                 // калькудтор ausn <section></section>. Либо можно искать по дата -атрибуту document.querySelector('[data-tax="ausn"]')
const formAusn = ausn.querySelector('.calc__form');                            //   форма
const resultTaxTotal = ausn.querySelector('.result__tax--total');
const calcLabelExpenses = ausn.querySelector('.calc__label--expenses');

// console.log('ausn.style ', ausn.style);                  // здесь храняься все стили элемента ausn. Это декларативные стили

calcLabelExpenses.style.display = 'none';

formAusn.addEventListener('input', debounceTimer(() => {                                      //   событие вешаем на форму,событие input- происходит при вводе символа, то есть при изменении атриюута  value  у input/textarea
      // чтобы получить элемент формы пишем так: formAusn.<значение атрибута name у поля>
      // console.log(formAusn.income.value);                                    //   у input есть атрибт name="income", так можно обрабтиться к значнеию атрибута name
      // console.log(formAusn.expenses.value);

      const income = formAusn.income.value;

      if (formAusn.type.value === 'income') {                                       //   <input type="radio" name="type" value="income">  если выбрали 1-ую радиокнокупку
            calcLabelExpenses.style.display = 'none';
            formAusn.income.value = '';
            resultTaxTotal.textContent = formatCurrency(income * 0.08);
      }
      if (formAusn.type.value === 'expenses') {                                     //   <input name="type" value="expenses">  если выбрали 2-ую радиокнопку
            const expenses = +formAusn.expenses.value;                             // + приводит из строки к числу
            resultTaxTotal.textContent = formatCurrency((income - expenses) * 0.2);
            calcLabelExpenses.style.display = 'block';
      }

}), 1000); //  1c = 1000ms, через 1с функция отработает
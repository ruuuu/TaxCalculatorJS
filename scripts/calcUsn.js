import { formatCurrency } from "./script.js";
// калькулятор УСН:


const LIMIT = 300.000;
const usn = document.querySelector('.usn');
const formOsn = usn.querySelector('.calc__form');

const resultBlockProperty = usn.querySelector('.result__block--property');          // блок
const resultBlockTotal = usn.querySelector('.result__block--total');                // блок

const calcLabelExpenses = usn.querySelector('.calc__label--expenses');               // <input type="number">
const calcLabelProperty = usn.querySelector('.calc__label--property');               // <input type="number">      

const resultTaxTotal = usn.querySelector('.result__tax--total');                    // p
const resultTaxProperty = usn.querySelector('.result__tax--property');              // p

// выясняеам какая радиокнопка выбрана:
const checkShowProperty = (typeTax) => {                    // радиокнопки   <input class="calc__radio" type="radio" name="typeTax" value="..."> 

      switch (typeTax) {
            case 'income': {                                                       //   если <input type="radio" value='income'>
                  calcLabelProperty.style.display = 'none';                        //   <input>
                  calcLabelExpenses.style.display = 'none';                        //   <input>
                  resultBlockProperty.style.display = 'none';
                  formOsn.expenses.value = '';                                      //  очищаем поле от предыдущих значений
                  formOsn.property.value = '';
                  break;                                                           //   этот кейс отработате и выйдет из swish
            };
            case 'ip-expenses': {
                  calcLabelProperty.style.display = '';                             //   если <input type="radio" value='expenses'>
                  calcLabelExpenses.style.display = 'none';
                  resultBlockProperty.style.display = 'none';
                  formOsn.property.value = '';
                  break;
            };
            case 'ooo-expenses': {
                  calcLabelProperty.style.display = '';
                  calcLabelExpenses.style.display = '';
                  resultBlockProperty.style.display = '';
                  break;
            };
      }


};



// вместо swithcase  можно все это сдлетаь через объект:
// const typeTax = {
//       'income': () => {
//             calcLabelProperty.style.display = 'none';
//             calcLabelExpenses.style.display = 'none';
//             resultBlockProperty.style.display = 'none';
//             formOsn.expenses.value = '';
//             formOsn.property.value = '';
//       },
//       'ip-expenses': () => {
//             calcLabelProperty.style.display = '';
//             calcLabelExpenses.style.display = 'none';
//             resultBlockProperty.style.display = 'none';
//             formOsn.property.value = '';

//       },
//       'ooo-expenses': () => {
//             calcLabelProperty.style.display = '';
//             calcLabelExpenses.style.display = '';
//             resultBlockProperty.style.display = '';
//       },
// };

// typeTax[formOsn.typeTax.value]();  // тк значением свойтсва обеъкта явялется фукнция, поэтмоу ставим круглые скобки


checkShowProperty(formOsn.typeTax.value);             //  нач значение

const percent = {
      'income': 0.06,
      'ip-expenses': 0.15,
      'ooo-expenses': 0.15
};



formOsn.addEventListener('input', () => {             //   событие вешаем на форму, при каждом вовде в поле, оно сработает
      checkShowProperty(formOsn.typeTax.value);       //   formOsn.typeTax.value это значение value у радиокнопки (name="typeTax")

      const income = +formOsn.income.value;                 // приводим строку к числу
      const expenses = +formOsn.expenses.value;
      const contributions = +formOsn.contributions.value;
      const property = +formOsn.property.value;

      let profit = income - contributions;
      if (formOsn.typeTax.value !== 'income') {
            profit -= expenses;
      }

      const taxBigIncome = income > LIMIT ? (profit - LIMIT) * 0.01 : 0;
      const summ = profit - (taxBigIncome < 0 ? 0 : taxBigIncome);

      const tax = summ * percent[formOsn.typeTax.value];
      const taxProperty = property * 0.02;

      resultTaxTotal.textContent = formatCurrency(tax);
      resultTaxProperty.textContent = formatCurrency(taxProperty);
});




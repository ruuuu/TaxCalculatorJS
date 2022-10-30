// калькулятор ОСНО:

const osno = document.querySelector('.osno');                        // <section>
const formOsno = osno.querySelector('.calc__form');
const ndflExpens = osno.querySelector('.result__block--ndfl-expenses');
const ndflIncomees = osno.querySelector('.result__block--ndfl-income');
const profit = osno.querySelector('.result__block--profit');

const resultTaxNds = osno.querySelector('.result__tax--nds');
const resultTaxProperty = osno.querySelector('.result__tax--property');
const resultTaxNdflExpenses = osno.querySelector('.result__tax--ndfl-expenses');
const resultTaxNdflIncome = osno.querySelector('.result__tax--ndfl-income');
const resultTaxProfit = osno.querySelector('.result__tax--profit');






// опрелеяет какая радиокнпока выбрана ИП или ООО;
const checkFormBusinness = () => {
      if (formOsno.formBusiness.value === 'ИП') {                 //   name="formBusiness" у  <input class="calc__radio" type="radio" value="ИП">
            ndflExpens.style.display = '';                        //   чтобы не нарушать верстку, если у элеента в стилях написано flex/grid/inline-blcok, то вместо block ставить пусто
            ndflIncomees.style.display = '';
            profit.style.display = 'none';
      }
      if (formOsno.formBusiness.value === 'ООО') {                //   name="formBusiness" у  <input class="calc__radio" type="radio" value="ООО"> 
            ndflExpens.style.display = 'none';
            ndflIncomees.style.display = 'none';
            profit.style.display = '';
      }
};




formOsno.addEventListener('input', () => {   // событие вешаем на форму, при каждом вводе символа/переключении чекбоксов/радиокнопок, вызовется прелаваемая  функция. Событие 'change' проиходйет при смене
      checkFormBusinness();

      const income = formOsno.income.value;  // значние поля <input name="income" type="text">

      const expenses = formOsno.expenses.value;

      const property = formOsno.property.value;

      const nds = income * 0.2;
      resultTaxNds.textContent = nds;

      const taxProperty = property * 0.02;
      resultTaxProperty.textContent = taxProperty;

      const profit = income - expenses;
      const ndflExpensesTotal = profit * 0.13;
      resultTaxNdflExpenses.textContent = ndflExpensesTotal;


      const ndflIncomeTotal = (income - nds) * 0.13;
      resultTaxNdflIncome.textContent = ndflIncomeTotal;

      const taxProfit = profit * 0.2;
      resultTaxProfit.textContent = taxProfit;
});


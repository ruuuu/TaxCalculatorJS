//   калькулятор Самозанятый:
import { formatCurrency } from "./script.js";
import { debounceTimer } from "./script.js";


const selfEmployment = document.querySelector('.self-employment');                              // <section>
const formSelfEmployment = selfEmployment.querySelector('.calc__form--selfemployment');                //   форма
const resultTaxSelfEmpolyment = selfEmployment.querySelector('.result__tax--selfemployment');
const calcCompensation = selfEmployment.querySelector('.calc__label_compensation');                   // поле Остаток вычета
const resultBlockCompensation = selfEmployment.querySelectorAll('.result__block--compensation');      // [div,div,div]

const resultTaxCompensation = selfEmployment.querySelector('.result__tax--compensation');
const resultTaxRestCompensation = selfEmployment.querySelector('.result__tax--rest-compensation');
const resultTaxResult = selfEmployment.querySelector('.result__tax--result');
const btnReset = selfEmployment.querySelector('.calc__btn-reset');  // нопка Очитсить

const checkCompensation = () => {
      const setDisplay = formSelfEmployment.addCompensation.checked ? 'block' : 'none';
      calcCompensation.style.display = setDisplay;

      resultBlockCompensation.forEach((elem, i, array) => {               //  перебираем псевдомассив(нодлист), метод применяет переданную фукнцию для каждлого элемета массива
            elem.style.display = setDisplay;
      });

}


checkCompensation();                                                                      // нач значение

const handlerForm = () => {                                     //  событие вешаем на форму, когда будем вводить символ в поле  или переключении чекбоксов/радиокнопок,, сработает событие 'input'
      const resIndividual = formSelfEmployment.incomeFizik.value * 0.04;                  //  formSelfEmployment.incomeFizik.value -значение поля <inut name="incomeFizik">
      const resEntity = formSelfEmployment.incomeLower.value * 0.06;
      checkCompensation();

      const tax = resIndividual + resEntity;
      formSelfEmployment.compensation.value > 10000 ? 10000 : formSelfEmployment.compensation.value;

      const benefit = formSelfEmployment.compensation.value;                              //  поле Остаток вычета
      const resBenefit = formSelfEmployment.incomeFizik.value * 0.01 + formSelfEmployment.incomeLower.value * 0.02;
      const finalBenefit = benefit - resBenefit > 0 ? (benefit - resBenefit) : 0;
      const finalTax = tax - (benefit - finalBenefit);

      resultTaxSelfEmpolyment.textContent = formatCurrency(tax);
      resultTaxCompensation.textContent = formatCurrency(benefit - finalBenefit);
      resultTaxRestCompensation.textContent = formatCurrency(finalBenefit);
      resultTaxResult.textContent = formatCurrency(finalTax);

};


// formSelfEmployment.addEventListener('reset', () => {   //  на форму навесили событие 'reset' для отчистки формы
//       setTimeout(handlerForm); // setTimeout кладет фукнию в  очедередь вызова(очередбь таймеров)
// });

// либо так:
btnReset.addEventListener('click', () => {
      formSelfEmployment.reset();
      resultTaxCompensation.textContent = '0';
      resultTaxRestCompensation.textContent = '0';
      resultTaxResult.textContent = '0';
      resultTaxSelfEmpolyment.textContent = '0';
})




formSelfEmployment.addEventListener('input', debounceTimer(handlerForm, 300));


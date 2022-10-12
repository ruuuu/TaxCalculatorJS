
const formatCurrency = (n) => {
      const currency = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 2 //  сколкьо знков после запятой
      });

      return currency.format(n);

}







const navigationLinks = document.querySelectorAll('.navigation__link');       // псевдомассив(NodeList-спсиок нод, каждый элемент на станице это нода) ссылок меню [a.navigation__link.navigation__link_active, a.navigation__link]
const calcElems = document.querySelectorAll('.calc');                         // [ section, section, section, section]


for (let i = 0; i < navigationLinks.length; i++) {

      navigationLinks[i].addEventListener('click', (evt) => {
            evt.preventDefault();                                                   //    отменяет дейсвите по  умолчанию
            // console.log(navigationLinks[i].dataset.tax);                      // выведем значнеие атрибута data-tax, dataset.<имя атрибута>
            for (let j = 0; j < calcElems.length; j += 1) {
                  if (navigationLinks[i].dataset.tax === calcElems[j].dataset.tax) {
                        calcElems[j].classList.add('calc_active');
                        // navigation__link_active
                        navigationLinks[j].classList.add('navigation__link_active');
                  }
                  else {
                        calcElems[j].classList.remove('calc_active');               // даже если класса у этого элемента не будет, все равно удаляем класс у него
                        navigationLinks[j].classList.remove('navigation__link_active');
                  }
            }
      });

}


// КАкулятор АУСН: 
const ausn = document.querySelector('.ausn');                                 // калькудтор ausn <section></section>
const formAusn = ausn.querySelector('.calc__form');                            //   форма
const resultTaxTotal = ausn.querySelector('.result__tax--total');
const calcLabelExpenses = ausn.querySelector('.calc__label--expenses');



calcLabelExpenses.style.display = 'none';

formAusn.addEventListener('input', () => {                                    // событие input- происходит при вводе текста, то есть при изменении атриюута  value  у input/textarea
      // чтобы получить элемент формы пишем так: formAusn.<значение атрибута nameу поля>
      // console.log(formAusn.income.value);                                    // у input есть атрибт name="income", так можно обрабтиться к значнеию атрибута name
      // console.log(formAusn.expenses.value);

      if (formAusn.type.value === 'income') {                                       // <input name="type">  если выбрали первый чекбокс
            calcLabelExpenses.style.display = 'none';
            formAusn.income.value = '';
            resultTaxTotal.textContent = formatCurrency(formAusn.income.value * 0.08);
      }
      if (formAusn.type.value === 'expenses') {                                     // <input name="type">  если выбрали первый чекбокс
            resultTaxTotal.textContent = formatCurrency((formAusn.income.value - formAusn.expenses.value) * 0.2);
            calcLabelExpenses.style.display = 'block';
      }

});



//   калькулятор Самозанятый:

const selfEmployment = document.querySelector('.self-employment');                        // <section>
const formSelfEmployment = selfEmployment.querySelector('.calc__form--selfemployment');                            //   форма
const resultTaxSelfEmpolyment = selfEmployment.querySelector('.result__tax--selfemployment');
const calcCompensation = selfEmployment.querySelector('.calc__label_compensation');   // поле Остаток вычета
const resultBlockCompensation = selfEmployment.querySelectorAll('.result__block--compensation'); // [div,div,div]

const resultTaxCompensation = selfEmployment.querySelector('.result__tax--compensation');
const resultTaxRestCompensation = selfEmployment.querySelector('.result__tax--rest-compensation');
const resultTaxResult = selfEmployment.querySelector('.result__tax--result');


const checkCompensation = () => {
      const setDisplay = formSelfEmployment.addCompensation.checked ? 'block' : 'none';
      calcCompensation.style.display = setDisplay;

      resultBlockCompensation.forEach((elem, i, array) => {               // перебираем массив, метод применяет переданную фукнцию для каждлого элемета массива
            elem.style.display = setDisplay;
      });

}


checkCompensation();                                                                      // нач значение


formSelfEmployment.addEventListener('input', () => {                                     //  когда будем вводить символ в поле, сработает событие 'input'
      const resIndividual = formSelfEmployment.incomeFizik.value * 0.04;
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

});
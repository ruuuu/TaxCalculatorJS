
const formatCurrency = (n) => {
      const currency = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 2 //  сколкьо знков после запятой
      });

      return currency.format(n);
}


const debounceTimer = (fn, msec) => { // debounce, fn- функция написанная нами,  msec-число милисекунд, тое тсь задержка

      return () => {  // эту функцю будем вызывать с задержкой

      }
};



// код каждого  калькульятора оьеренем в ифгурные скобки. так они удут изолированы др от друга
// код берем в фигурные скобки чтобы изолировать его др от друга(чтобы на использваоне пременнеы не ругался)
{
      // НАвигация
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
}



{
      // КАкулятор АУСН: 
      const ausn = document.querySelector('.ausn');                                 // калькудтор ausn <section></section>
      const formAusn = ausn.querySelector('.calc__form');                            //   форма
      const resultTaxTotal = ausn.querySelector('.result__tax--total');
      const calcLabelExpenses = ausn.querySelector('.calc__label--expenses');



      calcLabelExpenses.style.display = 'none';

      formAusn.addEventListener('input', () => {                                      //   событие вешаем на форму,событие input- происходит при вводе символа, то есть при изменении атриюута  value  у input/textarea
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

      });
}



{
      //   калькулятор Самозанятый:

      const selfEmployment = document.querySelector('.self-employment');                              // <section>
      const formSelfEmployment = selfEmployment.querySelector('.calc__form--selfemployment');                //   форма
      const resultTaxSelfEmpolyment = selfEmployment.querySelector('.result__tax--selfemployment');
      const calcCompensation = selfEmployment.querySelector('.calc__label_compensation');                   // поле Остаток вычета
      const resultBlockCompensation = selfEmployment.querySelectorAll('.result__block--compensation');      // [div,div,div]

      const resultTaxCompensation = selfEmployment.querySelector('.result__tax--compensation');
      const resultTaxRestCompensation = selfEmployment.querySelector('.result__tax--rest-compensation');
      const resultTaxResult = selfEmployment.querySelector('.result__tax--result');


      const checkCompensation = () => {
            const setDisplay = formSelfEmployment.addCompensation.checked ? 'block' : 'none';
            calcCompensation.style.display = setDisplay;

            resultBlockCompensation.forEach((elem, i, array) => {               //  перебираем псевдомассив(нодлист), метод применяет переданную фукнцию для каждлого элемета массива
                  elem.style.display = setDisplay;
            });

      }


      checkCompensation();                                                                      // нач значение


      formSelfEmployment.addEventListener('input', () => {                                     //  событие вешаем на форму, когда будем вводить символ в поле  или переключении чекбоксов/радиокнопок,, сработает событие 'input'
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

      });

}




{
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
}



{

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

            const income = +formOsn.income.value;                 // приводимстроку к числу
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


}


// Калькулятор 13%:
{
      const taxReturn = document.querySelector('.tax-return');
      const formTaxReturn = taxReturn.querySelector('.calc__form');

      const resultTaxNdfl = taxReturn.querySelector('.result__tax--ndfl');
      const resultTaxPossible = taxReturn.querySelector('.result__tax--possible');
      const resultTaxDeduction = taxReturn.querySelector('.result__tax--deduction');

      let timer;
      formTaxReturn.addEventListener('input', ({ target }) => {  // событие вешаем на орту, оно сработате если нажмем на чекбокс/радиокнопку, ввод символов в  поле
            clearTimeout();  // или clearInterval(). Не запускать функцию

            timer = setTimeout(() => { //  запустит фнукицю корую передали через определенное время (в ms)
                  //console.log('target ', target.value);

                  const expenses = +formTaxReturn.expenses.value;
                  const income = +formTaxReturn.income.value;
                  const sumExpense = +formTaxReturn.someExpenses.value;

                  const ndfl = 0.13 * income;
                  const possibleDeduction = expenses < sumExpense ? expenses * 0.13 : sumExpense * 0.13;
                  const deduction = possibleDeduction < ndfl ? possibleDeduction : ndfl;

                  resultTaxNdfl.textContent = formatCurrency(ndfl);
                  resultTaxPossible.textContent = formatCurrency(possibleDeduction);
                  resultTaxDeduction.textContent = formatCurrency(deduction);
            }, 500); // 500 ms, фукняи вызоветися  1 раз в полсекунды
      });
}

export const formatCurrency = (n) => {
      const currency = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 2 //  сколкьо знков после запятой
      });

      return currency.format(n);
};




export const debounceTimer = (fn, msec) => {                       // debounce, fn- функция написанная нами,  msec-число милисекунд, тое тсь задержка

      let lastCall = 0;
      let lastCallTimer;            // № таймера



      return (...arg) => {                                  // эту функцю будем вызывать с задержкой, у  arg используется  ... , чтоыб распаквать его
            const previousCall = lastCall;            // previousCall - предыдущий вызов фукнции, lastCall-последни вызов функии


            lastCall = Date.now();                    //  число милисекунд от 1970 года

            if (previousCall && ((lastCall - previousCall) <= msec)) {
                  clearTimeout();

            }

            setTimeout(() => {
                  fn(...arg);                               // запускаем переданную функию с задержкой 
            }, msec)


      }
};



// код каждого  калькульятора оберенем в фигурные скобки. так они будут изолированы друг от друга
// код берем в фигурные скобки чтобы изолировать его др от друга(чтобы на использваоне пременнеы не ругался)


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

            timer = setTimeout(() => { //  запустит фнукицю которую передали через определенное время (в ms)
                  //console.log('target ', target.value);

                  const expenses = +formTaxReturn.expenses.value;             // + приводит стчроку к числу
                  const income = +formTaxReturn.income.value;
                  const sumExpense = +formTaxReturn.someExpenses.value;

                  const ndfl = 0.13 * income;
                  const possibleDeduction = expenses < sumExpense ? expenses * 0.13 : sumExpense * 0.13;
                  const deduction = possibleDeduction < ndfl ? possibleDeduction : ndfl;

                  resultTaxNdfl.textContent = formatCurrency(ndfl);
                  resultTaxPossible.textContent = formatCurrency(possibleDeduction);
                  resultTaxDeduction.textContent = formatCurrency(deduction);
            }, 500); // 500 ms, то есть функция вызовется  1 раз в полсекунды
      });
}
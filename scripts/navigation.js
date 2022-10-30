// НАвигация:

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
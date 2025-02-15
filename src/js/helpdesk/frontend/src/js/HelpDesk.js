/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  init() {
    console.info('init');

    const btnAddTicket = document.querySelector('.btn_add_ticket');

    btnAddTicket.addEventListener('click', (e) => {
      console.log('click!');
      
    });
  }
}
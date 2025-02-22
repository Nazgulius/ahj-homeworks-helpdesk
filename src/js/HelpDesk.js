/**
 *  Основной класс приложения
 * */
import TicketForm from './TicketForm';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
    this.ticketForm = new TicketForm();
  }

  init() {
    console.info('init');
    this.ticketForm.createForm();


    const btnAddTicket = document.querySelector('.btn_add_ticket');
    const btnCensel = document.querySelector('.form_btn_censel');
    const mein = document.querySelector('.mein');
    const form = mein.querySelector('.form');
    // const titleInput = mein.querySelector('.form_title_1');
    // const textInput = mein.querySelector('.form_title_2');

    // показать форму
    btnAddTicket.addEventListener('click', (e) => {
      e.preventDefault();
      form.classList.remove('hidden');
    });

    // скрыть форму
    btnCensel.addEventListener('click', (e) => {
      e.preventDefault();
      form.classList.add('hidden');
    });

    // основной слушатель формы
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;

        console.log(xhr.responseText);
      };

      // xhr.open('GET', 'http://localhost:7070/?method=allTickets');
      xhr.open('GET', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=allTickets');

      xhr.send();
    });
  }
}

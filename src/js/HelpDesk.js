/**
 *  Основной класс приложения
 * */
import TicketForm from './TicketForm';
import Ticket from './Ticket';

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
    const titleInput = mein.querySelector('.form_title_1');
    const textInput = mein.querySelector('.form_title_2');

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

    // this.ticket.id = null;
    // this.ticket.name = titleInput;
    // this.ticket.description = textInput;
    // this.ticket.status = false;
    // this.ticket.created = new Date();

    
    let xhr = new XMLHttpRequest();
    
    // основной слушатель формы
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const ticket = new Ticket(null, titleInput, textInput, false, new Date());

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        console.log(xhr.responseText);
      };

      let json = JSON.stringify(ticket);

      //xhr.open("POST", '/submit')
      // xhr.open('GET', 'http://localhost:7070/?method=allTickets');
      xhr.open('POST', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=createTicket');
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(json);
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
          try {
              const data = JSON.parse(xhr.responseText);
              console.log(data);
          } catch (e) {
              console.error(e);
          }
      }
    });

  }
}

/**
 *  Основной класс приложения
 * */
import TicketForm from './TicketForm';
import Ticket from './Ticket';
import TicketView from './TicketView';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
    this.ticketForm = new TicketForm(); 
    this.ticketView = new TicketView();   
  }

  init() {
    console.info('init');
    this.ticketForm.createForm();

    const btnAddTicket = document.querySelector('.btn_add_ticket');
    const btnCensel = document.querySelector('.form_btn_censel');
    const mein = document.querySelector('.mein');
    const form = document.querySelector('.form');
    let data;


    // показать форму
    btnAddTicket.addEventListener('click', (e) => {
      e.preventDefault();
      form.classList.remove('hidden');
    });

    // скрыть форму
    btnCensel.addEventListener('click', (e) => {
      e.preventDefault();
      form.classList.add('hidden');
      form.querySelector('.form_input_1').value = '';
      form.querySelector('.form_input_2').value = '';
    });
    
    let xhr = new XMLHttpRequest();
    
    // основной слушатель формы
    form.addEventListener('submit', (e) => {
      e.preventDefault(); 
      const titleInput = form.querySelector('.form_input_1');
      const textInput = form.querySelector('.form_input_2');
      
      const ticket = new Ticket({
        id: null,
        name: titleInput.value,
        description: textInput.value,
        status: false,
        created: new Date(),
      });

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        console.log(xhr.responseText);
      };

      console.log(ticket);
      let json = JSON.stringify(ticket);
      console.log(json);

      //xhr.open("POST", '/submit')
      // xhr.open('GET', 'http://localhost:7070/?method=allTickets');
      xhr.open('POST', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=createTicket');
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(json);

      form.classList.add('hidden');
      titleInput.value = '';
      textInput.value = '';
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          data = JSON.parse(xhr.responseText);
          console.log(data);
          if (data) {
            this.ticketView.createTicket(data.id, data.name, data.description, data.status, data.created);             
          } else {  
            console.error('ticketData is undefined or null');  
          }
        } catch (e) {
          console.error(e);
        }
      }
    });

  }
}

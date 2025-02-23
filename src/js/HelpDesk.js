/**
 *  Основной класс приложения
 * */
import TicketForm from './TicketForm';
import Ticket from './Ticket';
import TicketView from './TicketView';
import TicketService from './TicketService';
import { listTicket } from './listTicket';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
    this.ticketForm = new TicketForm(); 
    this.ticketView = new TicketView();   
    this.ticketService = new TicketService();
  }

  init() {
    console.info('init');

    this.ticketService.list();
    this.ticketForm.createForm();

    const btnAddTicket = document.querySelector('.btn_add_ticket');
    const btnCensel = document.querySelector('.form_btn_censel');    
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

      console.log(ticket);
      this.ticketService.create(ticket);

      form.classList.add('hidden');
      titleInput.value = '';
      textInput.value = '';
    });

    // xhr.addEventListener('load', () => {
    //   if (xhr.status >= 200 && xhr.status < 300) {
    //     try {
    //       data = JSON.parse(xhr.responseText);
    //       console.log(data);
    //       if (data) {
    //         this.ticketView.createTicket(data.id, data.name, data.description, data.status, data.created);             
    //       } else {  
    //         console.error('ticketData is undefined or null');  
    //       }
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    // });
    
    
   
    
    // слушатель от боди для удаления тикета
    document.body.addEventListener('click', (event) => { 
      const dotClose = event.target.classList.contains('dot_close');
      const dotCloseX = event.target.classList.contains('dot_close_x');
      const ticketItem = event.target.closest('.ticket_item');
      if ((dotCloseX || dotClose) && ticketItem) {  
        console.log('click dot_close');  

        const listItem = listTicket.find((e) => e.id === ticketItem.id); 
        
        if (listItem) {  
          this.ticketService.delete(listItem.id);  
          ticketItem.remove();
        } else {  
          console.error('Ticket not found in the list.');  
        }  
      }  
    }); 
      
    

    
  }
}

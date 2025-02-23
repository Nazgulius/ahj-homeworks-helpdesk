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
    this.ticketForm.editForm();

    const btnAddTicket = document.querySelector('.btn_add_ticket');
    const btnCensel = document.querySelector('.form_btn_censel');    
    const form = document.querySelector('.create_form');
    const editForm = document.querySelector('.edit_form');

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
      
    // слушатель для редактирования тикета
    document.body.addEventListener('click', (event) => { 
      const dotClose = event.target.classList.contains('dot_edit');
      const ticketItem = event.target.closest('.ticket_item');
      // const ticketTitle = event.target.closest('.ticket_title');
      // const ticketTitle = ticketItem.querySelector('.ticket_title');
      const ticketTitle = ticketItem ? ticketItem.querySelector('.ticket_title') : null;

      if (dotClose && ticketItem) {  
        console.log('click dot_edit');  

        const listItem = listTicket.find((e) => e.id === ticketItem.id);
        
        if (listItem) {  
          editForm.classList.remove('hidden'); // показали форму
          editForm.querySelector('.form_input_1').value = listItem.name;
          editForm.querySelector('.form_input_2').value = listItem.description;

          // Удалим ранее добавленные обработчики  
          const cancelButton = editForm.querySelector('.form_btn_censel');  
          const okButton = editForm.querySelector('.form_btn_ok');  

          // Убедимся, что предыдущие обработчики не остаются  
          cancelButton.replaceWith(cancelButton.cloneNode(true));  
          okButton.replaceWith(okButton.cloneNode(true)); 
              
          editForm.querySelector('.form_btn_censel').addEventListener('click', e => {
            e.preventDefault();
            editForm.classList.add('hidden'); // скрыть форму
          });

          editForm.querySelector('.form_btn_ok').addEventListener('click', e => {
            e.preventDefault();
            // записываем локально
            listItem.name = editForm.querySelector('.form_input_1').value;

            if (ticketTitle) {  
              ticketTitle.textContent = listItem.name;
            } else {  
              console.error('ticketTitle не найден');
            }  
            
            listItem.description = editForm.querySelector('.form_input_2').value;
            
            this.ticketService.update(listItem.id, listItem);  // отправляем на сервер
            editForm.classList.add('hidden'); // скрыть форму
          });

        } else {  
          console.error('Ticket not found in the list.');  
        }  
      }  
    }); 
    

    
  }
}

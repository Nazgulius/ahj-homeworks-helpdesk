/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */

import TicketService from './TicketService';

export default class TicketView {
  constructor(id, name, description, status, created) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }

  createTicket(id, name, description, status, created) {
    const ticketItem = document.createElement('li');
    ticketItem.className = 'ticket_item';
    ticketItem.id = id;

    const dotStatus = document.createElement('div');
    dotStatus.className = 'dot_status circle';
    if (status) {
      dotStatus.background = 'green';
    } else {
      dotStatus.background = 'red';      
    }

    const ticketTitle = document.createElement('p');
    ticketTitle.className = 'ticket_title';
    ticketTitle.textContent = name;

    const ticketData = document.createElement('span');
    ticketData.className = 'ticket_data';
    ticketData.textContent = 'Date: ' + this.formatDate(created);
    
    const dotEdit = document.createElement('div');
    dotEdit.className = 'dot_edit circle';

    const dotClose = document.createElement('div');
    dotClose.className = 'dot_close circle';
    const dotCloseX = document.createElement('span');
    dotCloseX.className = 'dot_close_x';
    dotCloseX.textContent = 'X';   

    ticketItem.appendChild(dotStatus);
    ticketItem.appendChild(ticketTitle);
    ticketItem.appendChild(ticketData);
    ticketItem.appendChild(dotEdit);
    dotClose.appendChild(dotCloseX);
    ticketItem.appendChild(dotClose);
    document.querySelector('.ticket_list').appendChild(ticketItem);
  }

   formatDate(milliseconds) {  
    const date = new Date(milliseconds);  
    const day = date.getDate().toString().padStart(2, '0');  
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяц от 0 до 11  
    const year = date.getFullYear().toString().slice(-2);  
    return `${day}.${month}.${year}`;  
  } 
}

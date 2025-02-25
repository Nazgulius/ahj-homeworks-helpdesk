/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */

export default class TicketView {
  constructor(id, name, description, status, created) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }

  createTicket(id, name, description, status, created) {
    const ticketItem = document.createElement('div');
    ticketItem.className = 'ticket_item';
    ticketItem.id = id;

    const ticketItemHead = document.createElement('div');
    ticketItemHead.className = 'ticket_item_head';



    const dotStatus = document.createElement('div');
    dotStatus.className = 'dot_status circle';
    if (status) {
      dotStatus.style.background = 'green';
    } else {
      dotStatus.style.background = 'red';
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


    ticketItem.appendChild(ticketItemHead);
    ticketItemHead.appendChild(dotStatus);
    ticketItemHead.appendChild(ticketTitle);
    ticketItemHead.appendChild(ticketData);
    ticketItemHead.appendChild(dotEdit);
    dotClose.appendChild(dotCloseX);
    ticketItemHead.appendChild(dotClose);
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

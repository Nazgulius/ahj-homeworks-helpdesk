/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(subTitle, subText) {
    this.subTitle = subTitle;
    this.subText = subText;
  }

  createTicket() {
    console.log(`subTitle ${this.subText}
subText ${this.subText}`);

// const form = document.createElement('form');
// form.className = 'form hidden';
// form.method = 'POST';
// form.action = this.url;

// const formTitle = document.createElement('h3');
// formTitle.className = 'form_title';
// formTitle.textContent = 'Добавить тикет';

// form.appendChild(formTitle);
    const ticketItem = document.createElement('li');
    ticketItem.className = 'ticket_item';

    const dotStatus = document.createElement('div');
    dotStatus.className = 'dot_status circle';

    const ticketTitle = document.createElement('p');
    ticketTitle.className = 'ticket_title';
    ticketTitle.textContent = this.subTitle;

    const ticketData = document.createElement('span');
    ticketData.className = 'ticket_data';
    ticketData.textContent = 'Date: ';
    
    const dotEdit = document.createElement('div');
    dotEdit.className = 'dot_edit circle';

    const dotClose = document.createElement('div');
    dotClose.className = 'dot_close circle';
    dotClose.textContent = 'X';

    ticketItem.appendChild(dotStatus);
    ticketItem.appendChild(ticketTitle);
    ticketItem.appendChild(ticketData);
    ticketItem.appendChild(dotEdit);
    ticketItem.appendChild(dotClose);

  }
}

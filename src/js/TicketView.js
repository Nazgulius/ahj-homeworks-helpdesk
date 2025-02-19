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
  }
}

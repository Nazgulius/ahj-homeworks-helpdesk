/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    // xhr.open('GET', 'http://localhost:7070/?method=allTickets');
    console.log(`list ${callback}`);
  }

  get(id, callback) {
    console.log(`get ${id} ${callback}`);
  }

  create(data, callback) {
    console.log(`create ${data} ${callback}`);
  }

  update(id, data, callback) {
    console.log(`update ${id} ${data} ${callback}`);
  }

  delete(id, callback) {
    console.log(`delete ${id} ${callback}`);
  }
}

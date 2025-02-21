/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    // xhr.open('GET', 'http://localhost:7070/?method=allTickets');
    console.log(`list ${callback}`);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };
  
    // xhr.open('GET', 'http://localhost:7070/?method=allTickets');
    xhr.open('GET', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=allTickets');
  
    xhr.send();
  }

  get(id, callback) {
    console.log(`get ${id} ${callback}`);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    // xhr.open('GET', 'http://localhost:7070/?method=ticketById&id=' + id);
    xhr.open('GET', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=ticketById&id=' + id);

    xhr.send();
  }

  create(data, callback) {
    console.log(`create ${data} ${callback}`);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    // xhr.open('POST', 'http://localhost:7070/?method=createTicket');
    xhr.open('POST', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=createTicket');

    xhr.send();   
  }

  update(id, data, callback) {
    console.log(`update ${id} ${data} ${callback}`);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    // xhr.open('POST', 'http://localhost:7070/?method=updateById&id=' + id);
    xhr.open('POST', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=updateById&id=' + id);

    xhr.send(); 
  }

  delete(id, callback) {
    console.log(`delete ${id} ${callback}`);    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    // xhr.open('GET', 'http://localhost:7070/?method=deleteById&id=' + id);
    xhr.open('GET', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=deleteById&id=' + id);

    xhr.send();  
  }
}

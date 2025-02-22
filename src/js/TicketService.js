/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */

import TicketView from './TicketView';

export default class TicketService {
  list(callback) {
    console.log(`list ${callback}`);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };
  
    xhr.open('GET', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=allTickets');
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log(data);
          data.forEach((e) => {
            new TicketView().createTicket(e.id, e.name, e.description, e.status, e.created);             
          });
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  get(id, callback) {
    console.log(`get ${id} ${callback}`);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    
    xhr.open('GET', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=ticketById&id=' + id);
    xhr.send();

    
  }

  create(data, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };
    
    let json = JSON.stringify(callback);

    xhr.open('POST', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=createTicket');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log(data);
          if (data) {
            new TicketView().createTicket(data.id, data.name, data.description, data.status, data.created);             
          } else {  
            console.error('ticketData is undefined or null');  
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  update(id, data, callback) {
    console.log(`update ${id} ${data} ${callback}`);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

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

    xhr.open('GET', 'https://ahj-homeworks-helpdesk-server.onrender.com/?method=deleteById&id=' + id);
    xhr.send();  
  }
}

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */

import TicketView from './TicketView';
import { listTicket } from './listTicket';

export default class TicketService {
  constructor() {
    this.urlServer = 'https://ahj-homeworks-helpdesk-server.onrender.com/';
    this.urlLocal = 'http://localhost:7070/';
  }

  async list() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    xhr.open('GET', this.urlServer + '?method=allTickets');
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log(data);

          // записывам тикеты локально
          for (let e of data) {
            listTicket.push({
              id: e.id,
              name: e.name,
              description: e.description,
              status: e.status,
              created: e.created,
            });
          }
          
          // создаём тикеты на странице
          data.forEach((e) => {            
            new TicketView().createTicket(e.id, e.name, e.description, e.status, e.created);
          });
        } catch (e) {
          console.error(e);
        }
      }
    });

    // return new Promise((resolve, reject) => {  
    //   xhr.onreadystatechange = function () {  
    //     if (xhr.readyState === 4) {  
    //       if (xhr.status >= 200 && xhr.status < 300) {  
    //         try {  
    //           const data = JSON.parse(xhr.responseText);  
    //           console.log(data);                
    //           data.forEach((e) => { 
    //             listTicket.put({
    //               id: e.id, 
    //               name: e.name, 
    //               description: e.description, 
    //               status: e.status, 
    //               created: e.created,
    //             });                  
    //             new TicketView().createTicket(e.id, e.name, e.description, e.status, e.created);  
    //           });  
    //           resolve(data); // Успешный ответ  
    //         } catch (e) {  
    //           //console.error(e);  
    //           reject(e); // Ошибка парсинга  
    //         }  
    //       } else {  
    //         reject(new Error(`Request failed with status: ${xhr.status}`)); // Ошибка запроса  
    //       }  
    //     }  
    //   };  
    //   xhr.open('GET', this.urlServer + '?method=allTickets');  
    //   xhr.send(); // Этот вызов уже будет обработан внутри Promise  
    // }); 

  }

  get(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    xhr.open('GET', this.urlServer + '?method=ticketById&id=' + id);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log('полуичли data: ' + data);
          if (data) {
            return data;
          } else {  
            console.error('data JSON.parse is undefined or null');  
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  create(callback) {
    let xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState !== 4) return;
    //   console.log(xhr.responseText);
    // };

    let json = JSON.stringify(callback);
    console.log('Отправляемые данные:', json);

    xhr.open('POST', this.urlServer + '?method=createTicket');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log('полуичли data: ' + data);
          if (data) {
            new TicketView().createTicket(data.id, data.name, data.description, data.status, data.created);
            listTicket.push({
              id: data.id,
              name: data.name,
              description: data.description,
              status: data.status,
              created: data.created,
            });
          } else {  
            console.error('ticketData is undefined or null');  
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  update(id, callback) {
    let xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState !== 4) return;
    //   console.log(xhr.responseText);
    // };

    let json = JSON.stringify(callback);
    console.log('Отправляемые данные:', json);

    xhr.open('POST', this.urlServer + '?method=updateById&id=' + id);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
    
    // xhr.addEventListener('load', () => {
    //   if (xhr.status >= 200 && xhr.status < 300) {
    //     try {
    //       const data = JSON.parse(xhr.responseText);
    //       console.log('полуичли data: ' + data);
    //       if (data) {
    //         new TicketView().createTicket(data.id, data.name, data.description, data.status, data.created);
    //         listTicket.push({
    //           id: data.id,
    //           name: data.name,
    //           description: data.description,
    //           status: data.status,
    //           created: data.created,
    //         });
    //       } else {  
    //         console.error('ticketData is undefined or null');  
    //       }
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    // });
    
    
  }

  delete(id) {
    console.log('delete id ' + id);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    xhr.open('GET', this.urlServer + '?method=deleteById&id=' + id);
    xhr.send();
  }
}

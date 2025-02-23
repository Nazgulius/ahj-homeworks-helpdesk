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

    xhr.open('GET', this.urlLocal + '?method=allTickets');
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log(data);

          for (let e of data) {
            listTicket.push({
              id: e.id,
              name: e.name,
              description: e.description,
              status: e.status,
              created: e.created,
            });
          }
          
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
    //   xhr.open('GET', this.urlLocal + '?method=allTickets');  
    //   xhr.send(); // Этот вызов уже будет обработан внутри Promise  
    // }); 

  }

  get(id, callback) {
    console.log(`get ${id} ${callback}`);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    xhr.open('GET', this.urlLocal + '?method=ticketById&id=' + id);
    xhr.send();
  }

  create(callback) {
    let xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState !== 4) return;
    //   console.log(xhr.responseText);
    // };

    // let json = JSON.stringify(callback);
    // console.log('Отправляемые данные:', json);

    // xhr.open('POST', this.urlLocal + '?method=createTicket');
    // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // xhr.send(json);

    // xhr.addEventListener('load', () => {
    //   if (xhr.status >= 200 && xhr.status < 300) {
    //     try {
    //       const data = JSON.parse(xhr.responseText);
    //       console.log(data);
    //       if (data) {
    //         new TicketView().createTicket(data.id, data.name, data.description, data.status, data.created);             
    //       } else {  
    //         console.error('ticketData is undefined or null');  
    //       }
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    // });

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              console.log(data);
              // Убедитесь, что вы обрабатываете только отдельный объект, а не массив  
              if (data.id) {
                new TicketView().createTicket(data.id, data.name, data.description, data.status, data.created);
                resolve(data); // Успешный ответ  
              } else {
                console.error('Данные билета отсутствуют');
                reject(new Error('Данные билета отсутствуют'));
              }
            } catch (e) {
              console.error(e);
              reject(e); // Ошибка парсинга  
            }
          } else {
            reject(new Error(`Запрос не удался с кодом: ${xhr.status}`)); // Ошибка запроса  
          }
        }
      };

      let json = JSON.stringify(callback);

      xhr.open('POST', this.urlLocal + '?method=createTicket');
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(json); // Этот вызов уже будет обработан внутри Promise  
    });
  }

  update(id, data, callback) {
    console.log(`update ${id} ${data} ${callback}`);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    xhr.open('POST', this.urlLocal + '?method=updateById&id=' + id);
    xhr.send();
  }

  delete(id) {
    console.log('delete id ' + id);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.responseText);
    };

    xhr.open('GET', this.urlLocal + '?method=deleteById&id=' + id);
    xhr.send();
  }
}

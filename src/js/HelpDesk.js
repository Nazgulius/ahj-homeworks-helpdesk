/**
 *  Основной класс приложения
 * */
import TicketForm from './TicketForm';
import Ticket from './Ticket';
import TicketView from './TicketView';
import TicketService from './TicketService';
import TicketDelete from './TicketDelete';
import listTicket from './listTicket';

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
    this.popUpDel = new TicketDelete();
  }

  init() {
    console.info('init');

    this.ticketService.list();
    this.ticketForm.createForm();
    this.ticketForm.editForm();
    this.popUpDel.createPopDel();

    const btnAddTicket = document.querySelector('.btn_add_ticket');
    const btnCensel = document.querySelector('.form_btn_censel');
    const form = document.querySelector('.create_form');
    const editForm = document.querySelector('.edit_form');
    const popDel = document.querySelector('.pop_del');

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
          console.log('listItem ok');

          popDel.classList.remove('hidden');

          // слушатель на удаление - ОК
          document.querySelector('.pop_btn_ok').addEventListener('click', (e) => {
            e.preventDefault();
            this.ticketService.delete(listItem.id);
            ticketItem.remove();
            popDel.classList.add('hidden');
          });

          // слушатель на удаление - cancel
          document.querySelector('.pop_btn_cansel').addEventListener('click', (e) => {
            e.preventDefault();
            popDel.classList.add('hidden');
          });
        } else {
          console.error('Ticket not found in the list.');
        }
      }
    });

    // слушатель для редактирования тикета
    document.body.addEventListener('click', (event) => {
      const dotEdit = event.target.classList.contains('dot_edit');
      const ticketItem = event.target.closest('.ticket_item');
      const ticketTitle = ticketItem ? ticketItem.querySelector('.ticket_title') : null;

      if (dotEdit && ticketItem) {
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

          editForm.querySelector('.form_btn_censel').addEventListener('click', (e) => {
            e.preventDefault();
            editForm.classList.add('hidden'); // скрыть форму
          });

          // слушатель на кнопку "OK" в окне для изменений
          editForm.querySelector('.form_btn_ok').addEventListener('click', (e) => {
            e.preventDefault();
            // записываем локально
            listItem.name = editForm.querySelector('.form_input_1').value;

            if (ticketTitle) {
              ticketTitle.textContent = listItem.name;
            } else {
              console.error('ticketTitle не найден');
            }

            listItem.description = editForm.querySelector('.form_input_2').value;

            this.ticketService.update(listItem.id, listItem); // отправляем на сервер
            editForm.classList.add('hidden'); // скрыть форму
          });
        } else {
          console.error('Ticket not found in the list.');
        }
      }
    });

    // слушатель для просмотра подробностей тикета тикета
    document.body.addEventListener('click', (event) => {
      const ticketItemDev = event.target.closest('.ticket_item');

      // Проверяем, является ли клик внутри тикета
      if (ticketItemDev) {
        const ticketTitle = event.target.classList.contains('ticket_title');
        const ticketItem = event.target.classList.contains('ticket_item_head');

        if (ticketItem || ticketTitle) {
          // if (ticketItemDev) {
          console.log('ticket_item height ON');
          // ticketItemDev.style.height = 'auto';
          ticketItemDev.style.height = '100px';

          const listItem = listTicket.find((e) => e.id === ticketItemDev.id);

          let descriptionSpan = ticketItemDev.querySelector('.ticket_description');
          if (!descriptionSpan) {
            descriptionSpan = document.createElement('span');
            descriptionSpan.className = 'ticket_description';
            descriptionSpan.textContent = listItem.description;
            ticketItemDev.appendChild(descriptionSpan);
          }
        } else {
          // если нажмаем не на тикет, то скрываем и удаляем подробное описание
          console.log('ticket_item height OFF');
        }
      } else {
        // Клик вне элемента тикета
        console.log('ticket_item height OFF');

        // Закрываем все тикеты
        const allTicketItems = document.querySelectorAll('.ticket_item');
        allTicketItems.forEach((ticketItem) => {
          ticketItem.style.height = '53px';
          const descriptionSpan = ticketItem.querySelector('.ticket_description');
          if (descriptionSpan) {
            descriptionSpan.remove(); // удаляем элемент
          }
        });
      }
    });

    // находим и меняем цвет статуса
    document.body.addEventListener('click', (event) => {
      const dotStatus = event.target.classList.contains('dot_status');
      if (dotStatus) {
        const ticketItemDev = event.target.closest('.ticket_item');

        const listItem = listTicket.find((e) => e.id === ticketItemDev.id);

        const dotStatusDiv = ticketItemDev.querySelector('.dot_status');
        if (dotStatusDiv) {
          if (listItem.status) {
            listItem.status = false;
            dotStatusDiv.style.background = 'red';
            this.ticketService.update(listItem.id, listItem);
          } else {
            listItem.status = true;
            dotStatusDiv.style.background = 'green';
            this.ticketService.update(listItem.id, listItem);
          }
        }
      }
    });
  } // end init()
}

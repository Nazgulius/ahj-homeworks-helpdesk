/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {
    this.url = 'https://ahj-homeworks-helpdesk-server.onrender.com';
  }

  createForm() {
    const form = document.createElement('form');
    form.className = 'form hidden';
    form.method = 'POST';
    form.action = this.url;

    const formTitle = document.createElement('h3');
    formTitle.className = 'form_title';
    formTitle.textContent = 'Добавить тикет';

    form.appendChild(formTitle);

    const formBody = document.createElement('div');
    formBody.className = 'form_body';

    const formSubTitle1 = document.createElement('span');
    formSubTitle1.className = 'form_title_1';
    formSubTitle1.textContent = 'Кратное описание';

    const formInput1 = document.createElement('input');
    formInput1.className = 'form_input_1';
    formInput1.type = 'text';

    const formSubTitle2 = document.createElement('span');
    formSubTitle2.className = 'form_title_2';
    formSubTitle2.textContent = 'Подробное описание';
    
    const formInput2 = document.createElement('input');
    formInput2.className = 'form_input_2';
    formInput2.type = 'text';

    formBody.appendChild(formSubTitle1);
    formBody.appendChild(formInput1);
    formBody.appendChild(formSubTitle2);
    formBody.appendChild(formInput2);
    form.appendChild(formBody);

    const formButton = document.createElement('div');
    formButton.className = 'form_button';

    const btnCensel = document.createElement('button');
    btnCensel.className = 'form_btn_censel';
    btnCensel.textContent = 'Censel';
    const btnOk = document.createElement('button');
    btnOk.className = 'form_btn_ok';
    btnOk.textContent = ' OK ';

    formButton.appendChild(btnCensel);
    formButton.appendChild(btnOk);
    form.appendChild(formButton);

    document.querySelector('.mein').appendChild(form); // крепим форму к mein
  }
}

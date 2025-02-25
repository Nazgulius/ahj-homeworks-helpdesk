export default class TicketDelete {
  constructor() {

  }

  createPopDel() {
    const popDel = document.createElement('dev');
    popDel.className = 'pop_del hidden';

    const popTitle = document.createElement('h3');
    popTitle.className = 'pop_del_title';
    popTitle.textContent = 'Удалить тикет';

    popDel.appendChild(popTitle);

    const popParagraf = document.createElement('p');
    popParagraf.className = 'pop_paragraf';
    popParagraf.textContent = 'Вы уверены, что хотите удалить тикет? Это действие необратимо.';

    popDel.appendChild(popParagraf);

    const popButton = document.createElement('div');
    popButton.className = 'pop_button';

    const btnCensel = document.createElement('button');
    btnCensel.className = 'pop_btn_cansel';
    btnCensel.textContent = 'Cansel';
    const btnOk = document.createElement('button');
    btnOk.className = 'pop_btn_ok';
    btnOk.textContent = ' OK ';

    popButton.appendChild(btnCensel);
    popButton.appendChild(btnOk);
    popDel.appendChild(popButton);


    document.querySelector('.mein').appendChild(popDel); // крепим pop к mein
  }
}
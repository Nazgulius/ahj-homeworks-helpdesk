(()=>{"use strict";const e=document.getElementById("root"),t=new class{list(e){console.log(`list ${e}`)}get(e,t){console.log(`get ${e} ${t}`)}create(e,t){console.log(`create ${e} ${t}`)}update(e,t,n){console.log(`update ${e} ${t} ${n}`)}delete(e,t){console.log(`delete ${e} ${t}`)}},n=new class{constructor(e,t){if(!(e instanceof HTMLElement))throw new Error("This is not HTML element!");this.container=e,this.ticketService=t}init(){console.info("init");const e=document.querySelector(".btn_add_ticket"),t=document.querySelector(".form_btn_censel"),n=document.querySelector(".mein").querySelector(".form");e.addEventListener("click",(e=>{e.preventDefault(),n.classList.remove("hidden")})),t.addEventListener("click",(e=>{e.preventDefault(),n.classList.add("hidden")})),n.addEventListener("submit",(e=>{e.preventDefault();const t=new XMLHttpRequest;t.onreadystatechange=function(){4===t.readyState&&console.log(t.responseText)},t.open("GET","https://ahj-homeworks-helpdesk-server.onrender.com/?method=allTickets"),t.send()}))}}(e,t);n.init()})();
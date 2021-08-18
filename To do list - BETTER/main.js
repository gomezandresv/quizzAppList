

/*GIVE IT LIFE
<div class="todo__list" >
<label class="todo__item">
<input type="checkbox">
<div>ITEM 1</div>
<input type="button" value="X">
</label>
</input>*/

'use strict';

let banco = [];

//Read values
//With JSON.parse, we read it separately
const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
//Set actualize our storage
//STRING allow us to see all data of it
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

//indice helps us to difference items
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);//ADD RLRMNY
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

//READ DATABASE
const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco(); //In this case it gets/reads values
    //(item,indice) Discriminate values
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

//INSERT ITEM BY PRESSING "ENTER"
const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco(); //It gets/reads values
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco);//It receives data
        atualizarTela();//SHOW CHANGES
        evento.target.value = ''; //CLEAN TASK
    }
}

const removerItem = (indice) => {
    const banco = getBanco();//It takes storage's infomation
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();// Same here, it needs DATA
    //If it's empty, CHECKED, otherwise nothing
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    //Actualize it
    atualizarTela();
}

const clickItem = (evento) => {
const elemento = evento.target;
if (elemento.type === 'button') 
{
const indice = elemento.dataset.indice;
removerItem (indice);
}else if (elemento.type === 'checkbox') 
{
const indice = elemento.dataset.indice;
atualizarItem (indice);
}
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

//ALWAYS SHOW DATABASE
atualizarTela();
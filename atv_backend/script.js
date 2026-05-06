const modal = document.querySelector('.modal-container')
const tbody=document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao=document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const bntSalvar=document.querySelector('#bntSalvar')
let itens
let id
function openModal(edit = false, index = 0) {
    modal.classList.add('active')
    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active') }
    }

    if (edit) {
        sNome.value = itens[index].nome 
        sFuncao.value = itens[index].funcao 
        sSalario.value = itens[index].salario 
    }
    else { 
        sNome.value = '', sFuncao.value  = '',
        sSalario.value = '' }

    function editItem(index) {
        openModal(true, index) }
    
    function deleteItem(index) {
        itens.splice(index, 1)   
        setItensBD(), loadItens()
    }

    function insertItem(item, index) {
        let tr = document.createElement('tr')
       <td> tr.innerHTML = <td>${item.nome}</td>
        <td>${item.funcao}</td> 
        <td>R$ ${item.salario}</td> 

    }

    }
}
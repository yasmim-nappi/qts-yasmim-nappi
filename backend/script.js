const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar') 
 let itens
 let id 
 function openModal(edit = false, index = 0) {   modal.classList.add('active') 
   modal.onclick = e => {     
    if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active') 
    } 
  }   
  if (edit) {     
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index   }
    else {
        sNome.value = ''
        sFuncao.value = ''
        sSalario.value = '' 
  } 
   
}  function editItem(index) {
    id = itens[index].id;
}  
async function deleteItem(index) {   
    if (!itens[index]?.id) return;
    try {
        await fetch(`${API_BASE}/${itens[index].id}`, { method: 'DELETE' });
        loadItens();   } catch (error) {
            console.error('Erro ao deletar:', error); 
  } 
} 
 

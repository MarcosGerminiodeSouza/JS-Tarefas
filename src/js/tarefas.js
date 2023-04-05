let txtNovaTarefa = document.querySelector('#txtNovaTarefa');
let btnSalvar = document.querySelector('#btnSalvar');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEditar = document.querySelector('#janelaEditar');
let janelaFundo = document.querySelector('#janelaFundo');
let bntCancelarJanela = document.querySelector('#bntCancelarJanela');
let btnSalvarJanela = document.querySelector('#btnSalvarJanela');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let txtEditar = document.querySelector('#txtEditar');

// Enviar Tarefa ao HTML, com a tecla 'Enter'
txtNovaTarefa.addEventListener('keypress', (e) => {
    
    if(e.keyCode == 13) {
        let tarefa = {
            nome: txtNovaTarefa.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);   
    }
});

// Enviar Tarefa ao HTML, com 'Botão Salvar'
btnSalvar.addEventListener('click', (e) => {

    let tarefa = {
        nome: txtNovaTarefa.value,
        id: gerarId(),
    }
    adicionarTarefa(tarefa);
});

// Ação do 'Botão Salvar' na janela de Edição 
btnSalvarJanela.addEventListener('click', (e) => {
    e.preventDefault();

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');

    let tarefa = {
        nome: txtEditar.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if (tarefaAtual) {
    let li = criarTagLI(tarefa);
    listaTarefas.replaceChild(li, tarefaAtual);
    alternarJanelaEditar();
    } else {
        alert('Elemento HTML não encontrado!')
    }

});

// Ação do 'Botão Cancelar' na janela de Edição: fechar a janela sem realizar alterações
bntCancelarJanela.addEventListener('click', (e) => {
    alternarJanelaEditar();
});

// Função gerar #ID 
function gerarId() {
    return Math.floor(Math.random() * 40);
}

// Função Adicionar tarefa ao HTML
function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    txtNovaTarefa.value = '';
}

// Função Criar o objeto 'Tarefa' dentro da Lista
function criarTagLI(tarefa) {
    //Criando tag <li>, nosso objeto
    let li = document.createElement('li');
    li.id = tarefa.id;
    //Criar <span>, onde vai o texto 
    let span = document.createElement('span');
    span.classList.add('txtTarefa');
    span.innerHTML = tarefa.nome;
    //Criar uma divisão <div>
    let div = document.createElement('div');
    
    // Ação do 'Botão Editar'
    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnTarefa');
    btnEditar.innerHTML = 'Editar';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    //Ação do 'Botão Excluir'
    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnTarefa');
    btnExcluir.innerHTML = 'Excluir';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    //Adicionar os 'Botões' a <div>
    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);
    //Adicionar o 'texto' e 'div de Botões' à tarefa
    li.appendChild(span);
    li.appendChild(div);

    return li;
}

// Função da Ação 'Editar' dentro da janela
function editar(idTarefa) {

    let li = document.getElementById(''+ idTarefa + '');
        if (li) {
            idTarefaEdicao.innerHTML = '#' + idTarefa;
            //Captura texto da lista
            txtEditar.value = li.innerText;
            alternarJanelaEditar();
        } else {
            alert('Elemento HTML não encontrado!')
        }
}

// Função Confirmar a Ação 'Excluir'
function excluir(idTarefa) {
    //Aviso de confirmação
    let confirmacao = window.confirm('Tem certeza que deseja excluir?');

    //Ação Excluir
    if (confirmacao) {
        let li = document.getElementById(''+ idTarefa + '');
        if (li) {
            listaTarefas.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!')
        }
    }   
}

// Função de abrir janela de Edição
function alternarJanelaEditar() {
    janelaEditar.classList.toggle('abrir');
    janelaFundo.classList.toggle('abrir');
}
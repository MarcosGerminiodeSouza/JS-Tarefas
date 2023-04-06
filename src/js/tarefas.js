let txtNovaTarefa = document.querySelector('#txtNovaTarefa');   // Input: Escreve Nova Tarefa
let btnSalvar = document.querySelector('#btnSalvar');           // Botão Salvar: Cria Nova Tarefa.
let listaTarefas = document.querySelector('#listaTarefas');     // ul: Local de Armazenamento de Tarefas.
let idTarefaEdicao = document.querySelector('#idTarefaEdicao'); // h2: #Id Janela de Edição.
let janelaFundo = document.querySelector('#janelaFundo');       // Div: Fundo da Janela de Edição.
let janelaEdicao = document.querySelector('#janelaEdicao');     // Janela de Edição.
let txtEditar = document.querySelector('#txtEditar');           // Input: Editar Tarefa.
let btnSalvarJnl = document.querySelector('#btnSalvarJnl');     // Botão Salvar: Edição.
let bntCancelar = document.querySelector('#bntCancelar');       // Botão Cancelar: Edição.

// Evento: Enviar Tarefa ao HTML com a 'Tecla Enter'.
txtNovaTarefa.addEventListener('keypress', (e) => { 

    if(e.keyCode == 13) {
        let tarefa = {
            nome: txtNovaTarefa.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);   
    }
});

// Evento: Enviar Tarefa ao HTML com 'Botão Salvar'.
btnSalvar.addEventListener('click', (e) => {

    let tarefa = {
        nome: txtNovaTarefa.value,
        id: gerarId(),
    }
    adicionarTarefa(tarefa);
});

// Função: gerar #ID.
function gerarId() {
    return Math.floor(Math.random() * 40);
}

// Função: Adicionar tarefa ao HTML.
function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    txtNovaTarefa.value = '';
}

// Função: Criar TAG <li>.
function criarTagLI(tarefa) {
    // 1. TAG <li>
    let li = document.createElement('li');
    li.id = tarefa.id;
    // 2. TAG <span>
    let span = document.createElement('span');
    span.classList.add('txtTarefa');
    span.innerHTML = tarefa.nome;
    // 3. TAG <div>
    let div = document.createElement('div');    
    // 4. Botão Editar
    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnTarefa');
    btnEditar.innerHTML = 'Editar';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');
    // 5. Botão Excluir
    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnTarefa');
    btnExcluir.innerHTML = 'Excluir';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');
    // 6. Formar Tarefa
    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);
    
    li.appendChild(span);
    li.appendChild(div);

    return li;
}

// Evento: Ação do 'Botão Salvar' na janela de Edição.
btnSalvarJnl.addEventListener('click', (e) => {

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
    alternarJanelaEdicao();
    }
});

// Evento: Ação do 'Botão Cancelar' na janela de Edição.    (Voltar para corrigir)
bntCancelar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

// Função: Ação do Botão 'Excluir'.
function excluir(idTarefa) {
    // 1. Aviso de confirmação
    let confirmacao = window.confirm('Tem certeza que deseja excluir?');
    // 2. Ação Excluir
    if (confirmacao) {
        let li = document.getElementById(''+ idTarefa + '');
        if (li) {
            listaTarefas.removeChild(li);
        }
    }
}

// Função: Ação do Botão'Salvar' dentro da janela.  (Voltar para corrigir)
function editar(idTarefa) {
    let li = document.getElementById(''+ idTarefa + '');
        if (li) {
            idTarefaEdicao.innerHTML = '#' + idTarefa;
            txtEditar.value = li.innerText; // não consigo pegar apenas o texto do span
            alternarJanelaEdicao();
        }
}

// Função: Abrir janela de Edição.
function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaFundo.classList.toggle('abrir');
}
const formulario = document.querySelector("#cadastro");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const busca = document.querySelector("#busca");
const lista = document.querySelector("#lista");
const contagem = document.querySelector("#contagem");
const mensagem = document.querySelector("#mensagem");
const tituloFormulario = document.querySelector("#titulo-formulario");
const salvar = document.querySelector("#salvar");
const cancelar = document.querySelector("#cancelar");
const chave = "aula12-cadastro";
let pessoas = [];
let pessoaEmEdicao = null;

try {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    if (Array.isArray(dados)) pessoas = dados;
} catch {
    mensagem.textContent = "Não foi possível carregar os cadastros salvos.";
}

function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function renderizarTabela() {
    const termo = normalizar(busca.value.trim());
    const resultados = pessoas.filter((pessoa) =>
        normalizar(pessoa.nome).includes(termo) || normalizar(pessoa.email).includes(termo)
    );
    lista.replaceChildren();
    contagem.textContent = `${resultados.length} de ${pessoas.length} cadastro(s)`;

    for (const pessoa of resultados) {
        const linha = lista.insertRow();
        linha.insertCell().textContent = pessoa.nome;
        linha.insertCell().textContent = pessoa.email;

        const celula = linha.insertCell();
        celula.className = "acoes";
        celula.append(
            criarBotao("Editar", "secundario", pessoa, () => editar(pessoa)),
            criarBotao("Excluir", "excluir", pessoa, () => excluir(pessoa))
        );
    }

    if (resultados.length === 0) {
        const celula = lista.insertRow().insertCell();
        celula.colSpan = 3;
        celula.textContent = termo ? "Nenhum cadastro encontrado." : "Nenhum cadastro ainda.";
    }
}

function criarBotao(rotulo, classe, pessoa, acao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = rotulo;
    botao.className = classe;
    botao.setAttribute("aria-label", `${rotulo} ${pessoa.nome}`);
    botao.addEventListener("click", acao);
    return botao;
}

function atualizarPessoas(novaLista, aviso) {
    try {
        localStorage.setItem(chave, JSON.stringify(novaLista));
    } catch {
        mensagem.textContent = "Não foi possível salvar a alteração no navegador.";
        return false;
    }
    pessoas = novaLista;
    renderizarTabela();
    mensagem.textContent = aviso;
    return true;
}

function limparFormulario() {
    pessoaEmEdicao = null;
    formulario.reset();
    tituloFormulario.textContent = "Novo cadastro";
    salvar.textContent = "Cadastrar";
    cancelar.hidden = true;
}

function editar(pessoa) {
    pessoaEmEdicao = pessoa;
    nome.value = pessoa.nome;
    email.value = pessoa.email;
    tituloFormulario.textContent = "Editar cadastro";
    salvar.textContent = "Salvar alterações";
    cancelar.hidden = false;
    mensagem.textContent = "";
    nome.focus();
}

function excluir(pessoa) {
    if (!window.confirm(`Excluir o cadastro de ${pessoa.nome}?`)) return;
    if (atualizarPessoas(pessoas.filter((item) => item !== pessoa), "Cadastro excluído.")) {
        if (pessoaEmEdicao === pessoa) limparFormulario();
        busca.focus();
    }
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const dados = { nome: nome.value.trim(), email: email.value.trim().toLowerCase() };

    if (!dados.nome) {
        mensagem.textContent = "Informe um nome válido.";
        nome.focus();
        return;
    }
    if (pessoas.some((pessoa) => pessoa !== pessoaEmEdicao && pessoa.email === dados.email)) {
        mensagem.textContent = "Este e-mail já está cadastrado.";
        email.focus();
        return;
    }

    const novaLista = pessoaEmEdicao
        ? pessoas.map((pessoa) => pessoa === pessoaEmEdicao ? dados : pessoa)
        : [...pessoas, dados];
    const aviso = pessoaEmEdicao ? "Cadastro atualizado." : "Cadastro realizado.";
    if (atualizarPessoas(novaLista, aviso)) {
        limparFormulario();
        nome.focus();
    }
});

cancelar.addEventListener("click", () => {
    limparFormulario();
    mensagem.textContent = "Edição cancelada.";
    nome.focus();
});
busca.addEventListener("input", renderizarTabela);
renderizarTabela();

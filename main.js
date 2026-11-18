"use strict";

const CHAVE = "mural-aniversarios";
const form = document.getElementById("form");
const campoNome = document.getElementById("nome");
const campoNasc = document.getElementById("nasc");
const campoCor = document.getElementById("cor");
const lista = document.getElementById("pessoas");
const vazio = document.getElementById("vazio");
const btnTema = document.getElementById("btn-tema");
const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let pessoas = carregar();

/* ---------- armazenamento ---------- */
function carregar() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || []; }
  catch { return []; }
}
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(pessoas)); } catch {}
}

/* ---------- datas ---------- */
function partesData(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  return { a, m, d };
}
function diasAteAniversario(iso) {
  const { m, d } = partesData(iso);
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  let prox = new Date(hoje.getFullYear(), m - 1, d);
  if (prox < hoje) prox = new Date(hoje.getFullYear() + 1, m - 1, d);
  return Math.round((prox - hoje) / 86400000);
}
function idade(iso) {
  const { a, m, d } = partesData(iso);
  const hoje = new Date();
  let anos = hoje.getFullYear() - a;
  if (hoje.getMonth() + 1 < m || (hoje.getMonth() + 1 === m && hoje.getDate() < d)) anos--;
  return anos;
}
function formatar(iso) {
  const { a, m, d } = partesData(iso);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${a}`;
}

/* ---------- tela ---------- */
function criarCartao(p, animar) {
  const li = document.createElement("li");
  li.className = "cartao" + (animar ? " entrando" : "");
  li.style.setProperty("--cor", p.cor);
  li.dataset.id = p.id;

  const dias = diasAteAniversario(p.nasc);
  const textoDias = dias === 0 ? "Hoje é o aniversário!" : dias === 1 ? "Falta 1 dia" : `Faltam ${dias} dias`;

  const nome = document.createElement("h3");
  nome.textContent = p.nome;
  const info = document.createElement("p");
  info.textContent = `${formatar(p.nasc)} · ${idade(p.nasc)} anos`;
  const prox = document.createElement("p");
  prox.className = "dias";
  prox.textContent = textoDias;
  const excluir = document.createElement("button");
  excluir.type = "button";
  excluir.textContent = "Excluir";
  excluir.setAttribute("aria-label", `Excluir ${p.nome}`);
  excluir.addEventListener("click", () => remover(p.id, li));

  li.append(nome, info, prox, excluir);
  return li;
}
function desenhar() {
  lista.replaceChildren(...pessoas.map(p => criarCartao(p, false)));
  vazio.hidden = pessoas.length > 0;
}

/* ---------- cadastro ---------- */
form.addEventListener("submit", e => {
  e.preventDefault();
  const nome = campoNome.value.trim();
  const nasc = campoNasc.value;
  const hoje = new Date().toISOString().slice(0, 10);

  document.getElementById("erro-nome").textContent = nome ? "" : "Digite o nome da pessoa.";
  document.getElementById("erro-nasc").textContent =
    !nasc ? "Escolha a data de nascimento." : nasc > hoje ? "A data não pode estar no futuro." : "";
  if (!nome || !nasc || nasc > hoje) return;

  const p = { id: Date.now(), nome, nasc, cor: campoCor.value };
  pessoas.push(p);
  salvar();
  vazio.hidden = true;
  lista.append(criarCartao(p, true));
  form.reset();
  campoCor.value = "#ff6b6b";
  campoNome.focus();
  confete();
});

function remover(id, li) {
  const apagar = () => {
    pessoas = pessoas.filter(p => p.id !== id);
    salvar();
    desenhar();
  };
  if (reduzMovimento) return apagar();
  li.classList.add("saindo");
  li.addEventListener("animationend", apagar, { once: true });
}

/* ---------- tema claro / escuro ---------- */
function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  const escuro = tema === "escuro";
  btnTema.textContent = escuro ? "Tema claro" : "Tema escuro";
  btnTema.setAttribute("aria-pressed", String(escuro));
}
function temaInicial() {
  try {
    const salvo = localStorage.getItem("tema");
    if (salvo) return salvo;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
}
btnTema.addEventListener("click", () => {
  const novo = document.documentElement.dataset.tema === "escuro" ? "claro" : "escuro";
  aplicarTema(novo);
  try { localStorage.setItem("tema", novo); } catch {}
});

/* ---------- animação: confete no canvas ---------- */
const canvas = document.getElementById("confete");
const ctx = canvas.getContext("2d");
let pecas = [];
let rodando = false;

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", ajustarCanvas);
ajustarCanvas();

function confete() {
  if (reduzMovimento) return;
  const cores = ["#ff6b6b", "#ffd54a", "#4b3fe0", "#2ec4b6", "#ff9f1c"];
  for (let i = 0; i < 120; i++) {
    pecas.push({
      x: canvas.width / 2, y: canvas.height * 0.3,
      vx: (Math.random() - 0.5) * 14, vy: Math.random() * -12 - 2,
      tam: Math.random() * 8 + 5, rot: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 0.3,
      cor: cores[Math.floor(Math.random() * cores.length)]
    });
  }
  if (!rodando) { rodando = true; requestAnimationFrame(quadro); }
}
function quadro() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pecas.forEach(p => {
    p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.rot += p.vrot;
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = p.cor;
    ctx.fillRect(-p.tam / 2, -p.tam / 4, p.tam, p.tam / 2);
    ctx.restore();
  });
  pecas = pecas.filter(p => p.y < canvas.height + 20);
  if (pecas.length) requestAnimationFrame(quadro);
  else { rodando = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

/* ---------- início ---------- */
aplicarTema(temaInicial());
desenhar();
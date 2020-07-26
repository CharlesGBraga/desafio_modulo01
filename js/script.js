/*Declarando a variáveis*/
var form = document.querySelector('#form');
let buscaUsuario = document.querySelector('#buscaUsuario');
let botãoBuscarUsuario = document.querySelector('#botaoUsuario');

let painelUsuarios = document.querySelector('#painelUsuarios');
let dadosUsuarios = document.querySelector('#dadosUsuarios');
let painelEstatistica = document.querySelector('#painelEstatistica');
let dadosestatistica = document.querySelector('#dadosestatistica');

let todosUsuarios = [];
let usuariosFiltrados = [];

let masculino = 0;
let feminino = 0;
let idade = 0;
let mediaIdade = 0.0;

/*Iniciando o JS assim que o HTML esteja carregado*/
window.addEventListener('load', () => {
  buscaUsuario.addEventListener('keyup', disableInput);
  form.addEventListener('submit', formDefault);
  botãoBuscarUsuario.addEventListener('click', filtroUsuarios);

  fetchUsers();
});

/* Tratando eventos do Input Botão e Form*/
function disableInput(event) {
  evento = event.target.value;

  if (evento && evento != '') {
    botãoBuscarUsuario.removeAttribute('disabled', true);
  } else {
    botãoBuscarUsuario.setAttribute('disabled', true);
  }
}
function formDefault(event) {
  event.preventDefault();
}

/* Buscando Usuários da API*/
async function fetchUsers() {
  const resource = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await resource.json();
  todosUsuarios = json.results.map((usuario) => {
    return {
      nome: usuario.name.first + ' ' + usuario.name.last,
      imagem: usuario.picture.thumbnail,
      idade: usuario.dob.age,
      genero: usuario.gender,
    };
  });
}

/* Filtrando e passando o parâmetro para a função render()*/
const filtroUsuarios = () => {
  usuariosFiltrados = todosUsuarios.filter(
    (usuarios) =>
      usuarios.nome.toLowerCase().search(buscaUsuario.value.toLowerCase()) !==
      -1
  );
  usuariosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
  render(usuariosFiltrados);
};

function render(usuariosFiltrados) {
  renderUsuarios(usuariosFiltrados);
  renderEstatistica(usuariosFiltrados);
}
/* Renderizando a página*/
function renderUsuarios(usuarios) {
  let HTML = '<div>';
  if (usuarios.length >= 1) {
    usuarios.forEach((usuario) => {
      const { nome, imagem, idade } = usuario;

      const HTMLUser = `
        <div class='usuario'>
          <div>
            <img src="${imagem}" alt="imagem">
          </div>
          <div>
            <a>${nome} </a>
          </div>
          <div>
            <a>, ${idade} anos</a>
          </div>
        </div>
      `;
      HTML = HTML += HTMLUser;
      const HTMLQtd = `<div>${usuarios.length} usuário(s) encontrado(s)</div>`;
      painelUsuarios.innerHTML = HTMLQtd;
    });
  } else {
    const HTMLUser = `
    <div>
      <h5>Nenhum usuário filtrado</h5>
    </div>`;

    HTML += HTMLUser;
  }
  dadosUsuarios.innerHTML = HTML;
}

function renderEstatistica(usuarios) {
  if (usuarios) {
    masculino = usuarios.filter((usuario) => {
      return usuario.genero === 'male';
    });

    feminino = usuarios.filter((usuario) => {
      return usuario.genero === 'female';
    });

    idade = usuarios.reduce((accumulator, current) => {
      return accumulator + current.idade;
    }, 0);

    mediaIdade = idade / usuarios.length;

    const HTML = `
    <div class='estatistica'>
      <span><strong>Sexo masculino: </strong>${masculino.length}</span><br />
      <span><strong>Sexo feminino: </strong>${feminino.length}</span><br />
      <span><strong>Soma das idades: </strong>${idade}</span><br />
      <span><strong>Média das idades: </strong>${mediaIdade}<span>
    </div>
  `;
    dadosestatistica.innerHTML = HTML;
  }
}

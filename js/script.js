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
  // console.log(todosUsuarios);
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
  // console.log(usuariosFiltrados);
};

/* Renderizando a página*/
function render(usuarios) {
  let HTML = '<div>';
  if (usuarios.length >= 1) {
    usuarios.forEach((usuario) => {
      const { nome, imagem, idade } = usuario;
      // console.log(nome);
      // console.log(idade);
      const HTMLTemp = `
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
      HTML = HTML += HTMLTemp;
    });
    // console.log(usuarios);
  } else {
    const HTMLTemp = `
    <div>
      <h5>Nenhum usuário filtrado</h5>
    </div>`;

    HTML = HTML += HTMLTemp;
  }
  dadosUsuarios.innerHTML = HTML;
}

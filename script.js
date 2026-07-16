// Dark mode


    const btn = document.getElementById('toggle-theme');
    const body = document.body;

    // Se existir preferência salva, aplica
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
    }

    btn.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        // Salva a preferência do usuário
        localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
    });

// Hamburguer

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu-mobile");

hamburger.addEventListener("click", () => {

    menu.classList.toggle("ativo");

    if(menu.classList.contains("ativo")){
        hamburger.textContent="✖";
    }else{
        hamburger.textContent="☰";
    }

});

//

// Mudar e salvar fonte

const botoesFonte = document.querySelectorAll(".font-btn");

botoesFonte.forEach(botao => {

    botao.addEventListener("click", () => {

        const tamanho = botao.dataset.size;

        // Main
        document.querySelectorAll(".main p, .main li,  p, li").forEach(el => {
            el.style.fontSize = tamanho + "px";
        });

        // Sidebar
        document.querySelectorAll(".sidebar p, .sidebar li, .sidebar a").forEach(el => {
            el.style.fontSize = tamanho + "px";
        });

        // Salva
        localStorage.setItem("fonte", tamanho);

    });

});

// Recupera a fonte salva
const fonteSalva = localStorage.getItem("fonte");

if(fonteSalva){

    document.querySelectorAll(".main p, .main li,  p, li").forEach(el => {
        el.style.fontSize = fonteSalva + "px";
    });

    document.querySelectorAll(".sidebar p, .sidebar li, .sidebar a").forEach(el => {
        el.style.fontSize = fonteSalva + "px";
    });

}

// Pasta Projetos

function criarPasta(botao, conteudo, icone){

    const folder = document.getElementById(botao);
    const projects = document.getElementById(conteudo);
    const icon = document.getElementById(icone);

    folder.addEventListener("click", ()=>{

        projects.classList.toggle("ativo");

        icon.textContent = projects.classList.contains("ativo")
            ? "📂"
            : "📁";

    });

}


criarPasta("folderProfissionais","profissionais","folderIconProfissionais");
criarPasta("folderPessoais","pessoais","folderIconPessoais");


// Mudar Idioma



async function mudarIdioma(idioma){

    localStorage.setItem("idioma", idioma);

    const resposta = await fetch(`lang/${idioma}.json`);

    const textos = await resposta.json();

    document.querySelectorAll("[data-i18n]").forEach(elemento=>{

        const chave = elemento.dataset.i18n;

        elemento.textContent = textos[chave] ?? elemento.textContent;

    });

}

const idioma = localStorage.getItem("idioma") || "pt";

mudarIdioma(idioma);

function getTranslation(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

document.querySelectorAll("[data-i18n]").forEach(el => {
  const key = el.dataset.i18n;
  const text = getTranslation(translations, key);

  if (text) {
    el.textContent = text;
  }
});
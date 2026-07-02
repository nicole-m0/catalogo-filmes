const apiKey = "cfa8285f5f5e509045dbafd59c4932e5";

async function buscarFilmes() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    cardsPopulares();
    cardsAvaliados();
    cardsMelhores();
    console.log(dados);
}

    function criarCards(filmes, lista) {

    lista.innerHTML = "";

    filmes.forEach(filme => {

        lista.innerHTML += `
            <div class="cardFilme">
                <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}">
                <h3>${filme.title}</h3>
                <p>${filme.release_date.substring(0,4)}</p>
                <p>${filme.vote_average.toFixed(1)}</p>
            </div>
        `;
    });

}

 //card populares: foto(poster_path),título: title, ano: release_date, estrelas:vote_average
    async function cardsPopulares(){
    const resposta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`);
    const dados = await resposta.json();
    criarCards(dados.results, document.getElementById("listaPopulares"));
}

    async function cardsAvaliados() {
         const resposta = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR`);
        const dados = await resposta.json();
        criarCards(dados.results, document.getElementById("listaAlta"));
    }

    async function cardsMelhores() {
         const resposta = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`);
        const dados = await resposta.json();
        criarCards(dados.results, document.getElementById("listaAvaliados"));
    }

buscarFilmes();


// scroll
const secoes = document.querySelectorAll("main section");
const links = document.querySelectorAll("#ulFicha a");

window.addEventListener("scroll", () => {

    let atual = "";

    secoes.forEach(secao => {
        const topo = secao.offsetTop - 120;

        if(scrollY >= topo){
            atual = secao.id;
        }
    });

    links.forEach(link => {
        link.classList.remove("ativo");

        if(link.getAttribute("href") === "#" + atual){
            link.classList.add("ativo");
        }
    });

});

async function pesquisarFilmes(nome){

    const resposta = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(nome)}`
    );

    const dados = await resposta.json();

    document.getElementById("resultadoPesquisa").style.display = "block";
    document.getElementById("tituloPesquisa").innerHTML =
        `Resultados para "${nome}"`;

    criarCards(
        dados.results,
        document.getElementById("listaPesquisa")
    );
}

const pesquisa = document.getElementById("pesquisa");
let timeout;

pesquisa.addEventListener("input", () => {

    clearTimeout(timeout);
    const nome = pesquisa.value.trim();

    if(nome === ""){
        document.getElementById("resultadoPesquisa").style.display = "none";
        return;
    }

    timeout = setTimeout(() => {
        pesquisarFilmes(nome);
    }, 500);

});
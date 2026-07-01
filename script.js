const apiKey = "";

async function buscarFilmes() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    cardsPopulares(dados.results)
    console.log(dados);
}

 //card populares: foto(poster_path),título: title, ano: release_date, estrelas:vote_average
    function cardsPopulares(filmes) {
        filmes.forEach(filme => {
            const capa = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
            const titulo = filme.title;
            const ano = filme.release_date.slice(0, 4);
            const estrelas = filme.vote_average.toFixed(1);

            const cardFilme = document.createElement('div');
            cardFilme.classList.add('cardFilme');

            cardFilme.innerHTML = `
                <img src="${capa}" alt="capa do filme">
                <span>${titulo}</span>
                <p>${ano}</p>
                <p>⭐${estrelas}</p>
            `;

            const listapopulares = document.getElementById('listaPopulares');
            listapopulares.appendChild(cardFilme);
        });   
    }

buscarFilmes();

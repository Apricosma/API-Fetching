"use strict";

const url = 'https://api.andrespecht.dev/movies';

const options = {
    method: 'GET',
    morde: 'cors'
};

async function getMovies() {
    try {
        const response = await fetch(url, options);
        if(!response.ok) {
            throw new Error('Network response error');
        }

        const data = await response.json();

        console.log(data.response);

        return data.response;
    } catch (error) {
        console.error(error);
    }
}

function printMovies(movies) {
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        appendCardToContainer(card);
    })
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('moviecard');

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const year = document.createElement('p');
    year.textContent = movie.year;

    const img = document.createElement('img');
    img.src = movie.poster;
    img.alt = `Movie poster for ${movie.title}`;
    
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(year);

    return card;
}

function appendCardToContainer(card) {
    const container = document.querySelector('.movielist');
    container.appendChild(card);
}

getMovies()
    .then(movies => printMovies(movies));
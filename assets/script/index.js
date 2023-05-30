"use strict";

const url = 'https://api.andrespecht.dev/movies';
const cityUrl = 'https://countriesnow.space/api/v0.1/countries/cities';

const options = {
    method: 'GET',
    mode: 'cors'
};

const cityOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
        country: 'canada'
    })
};

// global movies
let movies = [];
let cities = [];

async function getMovies() {
    try {
        const response = await fetch(url, options);
        if(!response.ok) {
            throw new Error('Network response error');
        }

        const data = await response.json();
        movies = data.response;

        // console.log(data.response);

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

function movieSearch() {
    const searchInput = document.querySelector('.moviesearch');
    const suggestions = document.querySelector('.suggestions');

    // search on input
    searchInput.addEventListener('input', (event) => {
        const searchTerm = searchInput.value.toLowerCase();
        suggestions.innerHTML = '';

        if (searchTerm.trim() !== ''){
            const filter = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm)
            );

            filter.forEach(movie => {
                const div = document.createElement('div');
                div.textContent = movie.title;
                suggestions.appendChild(div);
                // console.log(movie.title);
            });
        }

    });
    
    clearSearchOnEsc(searchInput, suggestions);
}

async function getCities() {
    try {
        const response = await fetch(cityUrl, cityOptions);
        if(!response.ok) {
            throw new Error('Network response error');
        }

        const data = await response.json();

        cities = data.data;

        // console.log(cities);

        return data.response;
    } catch (error) {
        console.error(error);
    }
}

function searchCities() {
    const searchInput = document.querySelector('.citysearch');
    const suggestions = document.querySelector('.city-suggestions');

    searchInput.addEventListener('input', (event) => {
        const searchTerm = searchInput.value.toLowerCase();
        suggestions.innerHTML = '';
        // console.log(cities);
        if (searchTerm.trim() !== ''){
            const filteredCities = cities.filter(city =>
                city.toLowerCase().includes(searchTerm)
            );

            filteredCities.forEach(city => {
                const div = document.createElement('div');
                div.textContent = city;
                suggestions.appendChild(div);
            });
        }
    });

    clearSearchOnEsc(searchInput, suggestions);
}

function clearSearchOnEsc(searchInput, suggestions) {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchInput.value = '';
            searchInput.innerHTML = '';
            suggestions.innerHTML = '';
        }
    });
}

movieSearch();
getCities();
searchCities();
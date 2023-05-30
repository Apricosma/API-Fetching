import { getMovies, printMovies, movieSearch } from './movies.js';
import { getCities, searchCities } from './cities.js';

"use strict";

getMovies()
    .then(movies => printMovies(movies));

movieSearch();
getCities();
searchCities();
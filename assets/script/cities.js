import { clearSearchOnEsc } from "./utility.js";

const cityUrl = 'https://countriesnow.space/api/v0.1/countries/cities';

const cityOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
        country: 'canada',
        country: 'united states'
    })
};

let cities = [];

export async function getCities() {
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

export function searchCities() {
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
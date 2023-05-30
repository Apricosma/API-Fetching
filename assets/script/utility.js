export function clearSearchOnEsc(searchInput, suggestions) {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchInput.value = '';
            searchInput.innerHTML = '';
            suggestions.innerHTML = '';
        }
    });
}
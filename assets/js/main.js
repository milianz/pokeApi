document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const pokemonCards = document.getElementById('pokemon-cards'); // Actualizamos a 'pokemon-cards'
  
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        searchPokemon(query);
      }
    });
  
    function searchPokemon(query) {
      let url;
      if (!isNaN(query)) {
        url = `https://pokeapi.co/api/v2/pokemon/${query}`;
      } else {
        url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
      }
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }
          return response.json();
        })
        .then(data => {
          displayPokemonInfo(data);
        })
        .catch(error => {
          pokemonCards.innerHTML = '<p>No se encontró el Pokémon. Inténtalo de nuevo.</p>';
          console.error('Error al buscar el Pokémon:', error);
        });
    }
  
    function displayPokemonInfo(pokemon) {
      const types = pokemon.types.map(type => type.type.name);
      const abilities = pokemon.abilities.map(ability => ability.ability.name);
      const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`);
  
      pokemonCards.innerHTML = `
        <div class="pokemon-card">
          <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <p>Número: #${pokemon.id}</p>
          <p>Tipos: ${types.join(', ')}</p>
          <p>Habilidades: ${abilities.join(', ')}</p>
          <p>Estadísticas:</p>
          <ul>
            ${stats.map(stat => `<li>${stat}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  });
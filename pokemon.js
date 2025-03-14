const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

const getPokemonDetails = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPokemonDetails(data);
}

const displayPokemonDetails = (pokemon) => {
    const pokemonDetailsEl = document.getElementById('pokemon-details');
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const poke_types = pokemon.types.map(type => type.type.name).join(', ');
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');

    const pokemonDetailsHTML = `
        <h1>${name} (#${id})</h1>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemon.id}.png" alt="${name}">
        <p>Type: ${poke_types}</p>
        <p>Abilities: ${abilities}</p>
        <p>Stats: ${stats}</p>
    `;
    pokemonDetailsEl.innerHTML = pokemonDetailsHTML;
}

getPokemonDetails(pokemonId);
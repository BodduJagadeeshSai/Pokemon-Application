import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePokemonContext } from '../context/PokemonContext';
import '../styles.css';

const PokemonDetail = () => {
  const { name } = useParams();
  const { state, dispatch } = usePokemonContext();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      if (!state.pokemonDetails[name]) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        dispatch({ type: 'SET_POKEMON_DETAIL', payload: { name, data } });
      }
    };

    fetchPokemonDetail();
  }, [name, state.pokemonDetails, dispatch]);

  const pokemon = state.pokemonDetails[name];

  if (!pokemon) {
    return <div>Loading... Please wait!🤗</div>;
  }

  return (
    <div className="pokemon-detail">
      <h2>{pokemon.name}</h2>
      <div className="sprites">
        {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
        {pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} alt={pokemon.name} />}
        {pokemon.sprites.front_shiny && <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />}
        {pokemon.sprites.back_shiny && <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />}
      </div>
      <ul>
        <li>Height: {pokemon.height}</li>
        <li>Weight: {pokemon.weight}</li>
      </ul>
      <div className="abilities">
        <h3>Abilities:</h3>
        {pokemon.abilities.map((abilityObj) => (
          <div key={abilityObj.ability.name} className="ability">
            {abilityObj.ability.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetail;

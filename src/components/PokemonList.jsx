import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemonContext } from '../context/PokemonContext';
import '../styles.css';

const PokemonList = () => {
  const { state, dispatch } = usePokemonContext();

  const handlePageChange = (newPage) => {
    dispatch({ type: 'SET_PAGE', payload: newPage });
  };

  return (
    <div className="container">
      <h1 class="PokemonListHeading">Pokemons</h1>
      <div className="pokemon-list">
        {state.pokemonList.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name} className="pokemon-item">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
            <h3>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h3>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button disabled={state.currentPage === 1} onClick={() => handlePageChange(state.currentPage - 1)}>Previous</button>
        <span>Page {state.currentPage} of {state.totalPages}</span>
        <button disabled={state.currentPage === state.totalPages} onClick={() => handlePageChange(state.currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PokemonList;


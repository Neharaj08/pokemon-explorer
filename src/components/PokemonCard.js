import React from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <div className="types">
        {pokemon.types.map((type) => (
          <span key={type} className={`type ${type}`}>{type}</span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;

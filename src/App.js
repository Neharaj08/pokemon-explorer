import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import Loading from './components/Loading';
import Error from './components/Error';
import EmptyState from './components/EmptyState';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const promises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        });
        const results = await Promise.all(promises);

        const formattedResults = results.map((poke) => ({
          id: poke.id,
          name: poke.name,
          image: poke.sprites.front_default,
          types: poke.types.map((typeInfo) => typeInfo.type.name),
        }));

        setPokemonList(formattedResults);
        setFilteredPokemon(formattedResults);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList;

    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(pokemon =>
        pokemon.types.includes(selectedType.toLowerCase())
      );
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="App">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {filteredPokemon.length === 0 ? (
        <EmptyState />
      ) : (
        <PokemonList pokemonList={filteredPokemon} />
      )}
    </div>
  );
}

export default App;

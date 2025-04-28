import React from 'react';

function SearchBar({ searchTerm, setSearchTerm, selectedType, setSelectedType }) {
  const types = [
    'All', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison',
    'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark',
    'Dragon', 'Steel', 'Fairy', 'Normal'
  ];

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        {types.map((type) => (
          <option value={type} key={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;

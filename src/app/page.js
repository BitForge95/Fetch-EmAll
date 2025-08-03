'use client';
import React, { useState } from 'react';


export default function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    if (!pokemonName) return;
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();
      setPokemonData({
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        abilities: data.abilities.map(a => a.ability.name),
        stats: data.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setPokemonData(null);
    }
  };

  return (
    <div className='Main-Div'>
      <h1 className="Header">Fetch’EmAll</h1>
      <div className="form-group">
        <input
          className="input-file"
          placeholder="e.g., bulbasaur"
          value={pokemonName}
          onChange={e => setPokemonName(e.target.value)}
        />
        <button className="Search-Button" onClick={fetchPokemon}>Search</button>
      </div>

      {error && <p style={{ color: '#f87171', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}

      {pokemonData && (
        <div className="Pokemon-Card">
          <h2 className="Pokemon-Name">{pokemonData.name.toUpperCase()}</h2>
          <div className="grid-main">
            <img className="Pokemon-Image" src={pokemonData.image} alt={pokemonData.name} />
            <div>
              {pokemonData.stats && (
                <div className="stats-Panel">
                  {pokemonData.stats.map(stat => (
                    <div key={stat.name} className="stat-item">
                      <strong>{stat.name.toUpperCase()}:</strong> {stat.value}
                    </div>
                  ))}
                </div>
              )}
              <h3 className="Pokemon-subHead">Abilities</h3>
              <div className="Abilities">
                {pokemonData.abilities.map(a => (
                  <div key={a} className="Pokemon-abilities">{a}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';

interface ArtworkSearchProps {
  onSearch: (query: string) => void;
}

const ArtworkSearch: React.FC<ArtworkSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="search-container">
      <h2>Explorez l'Art du Metropolitan Museum</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Recherchez par artiste, titre, technique..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Rechercher
        </button>
      </form>
      <div className="search-suggestions">
        <p>Suggestions: Monet, Impressionisme, Portrait, Sculpture...</p>
      </div>
    </div>
  );
};

export default ArtworkSearch;

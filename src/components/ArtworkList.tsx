import React from 'react';
import { Artwork } from '../types/artwork';

interface ArtworkListProps {
  artworks: Artwork[];
  loading: boolean;
  onSelectArtwork: (artwork: Artwork) => void;
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworks, loading, onSelectArtwork }) => {
  if (loading) {
    return <div className="loading">Chargement des œuvres...</div>;
  }

  if (artworks.length === 0) {
    return <div className="no-results">Aucune œuvre trouvée. Essayez une autre recherche.</div>;
  }

  return (
    <div className="artwork-grid">
      {artworks.map((artwork) => (
        <div 
          key={artwork.objectID} 
          className="artwork-card"
          onClick={() => onSelectArtwork(artwork)}
        >
          {artwork.primaryImage ? (
            <img 
              src={artwork.primaryImage} 
              alt={artwork.title} 
              className="artwork-image"
            />
          ) : (
            <div className="no-image">Image non disponible</div>
          )}
          <div className="artwork-info">
            <h3>{artwork.title}</h3>
            <p>{artwork.artistDisplayName || 'Artiste inconnu'}</p>
            <p>{artwork.objectDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtworkList;

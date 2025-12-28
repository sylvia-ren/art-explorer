import React, { useState, useEffect } from 'react';
import './App.css';
import ArtworkSearch from './components/ArtworkSearch';
import ArtworkList from './components/ArtworkList';
import ArtworkDetail from './components/ArtworkDetail';
import VisualizationChart from './components/VisualizationChart';
import { searchArtworks, getArtworkDetails } from './services/api';
import { Artwork } from './types/artwork';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Effectue une recherche avec un terme initial au chargement
  useEffect(() => {
    const initialSearch = async () => {
      handleSearch('impressionism');
    };
    initialSearch();
  }, []);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchArtworks(searchQuery);
      
      if (result.total === 0 || !result.objectIDs) {
        setArtworks([]);
        setLoading(false);
        return;
      }
      
      // Limiter à 20 résultats pour des performances raisonnables
      const limitedIds = result.objectIDs.slice(0, 20);
      
      // Récupérer les détails de chaque œuvre
      const artworkPromises = limitedIds.map(id => getArtworkDetails(id));
      const artworkDetails = await Promise.all(
        // Gérer les erreurs individuelles pour éviter qu'une seule erreur n'interrompe tout
        artworkPromises.map(p => p.catch(e => null))
      );
      
      // Filtrer les résultats null (ceux qui ont échoué)
      const validArtworks = artworkDetails.filter(artwork => artwork) as Artwork[];
      setArtworks(validArtworks);
    } catch (err) {
      console.error('Error during search:', err);
      setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeArtworkDetail = () => {
    setSelectedArtwork(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>ArtExplorer</h1>
      </header>
      
      <main className="app-main">
        <ArtworkSearch onSearch={handleSearch} />
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="content-container">
          <div className="results-container">
            <ArtworkList 
              artworks={artworks} 
              loading={loading} 
              onSelectArtwork={handleSelectArtwork} 
            />
          </div>
          
          <div className="visualization-container">
            <VisualizationChart artworks={artworks} />
          </div>
        </div>
        
        {selectedArtwork && (
          <ArtworkDetail 
            artwork={selectedArtwork} 
            onClose={closeArtworkDetail} 
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>Projet réalisé avec TypeScript et l'API du Metropolitan Museum of Art</p>
      </footer>
    </div>
  );
};

export default App;

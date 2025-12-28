import React from 'react';
import { Artwork } from '../types/artwork';

interface ArtworkDetailProps {
  artwork: Artwork | null;
  onClose: () => void;
}

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ artwork, onClose }) => {
  if (!artwork) {
    return null;
  }

  return (
    <div className="artwork-detail-modal">
      <div className="artwork-detail-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        
        <div className="artwork-detail-layout">
          <div className="artwork-image-container">
            {artwork.primaryImage ? (
              <img 
                src={artwork.primaryImage} 
                alt={artwork.title} 
                className="artwork-detail-image"
              />
            ) : (
              <div className="no-image-large">Image non disponible</div>
            )}
          </div>
          
          <div className="artwork-detail-info">
            <h2>{artwork.title}</h2>
            
            {artwork.artistDisplayName && (
              <p className="artist-name">{artwork.artistDisplayName}</p>
            )}
            
            <div className="artwork-metadata">
              {artwork.objectDate && (
                <div className="metadata-item">
                  <strong>Date:</strong> {artwork.objectDate}
                </div>
              )}
              
              {artwork.medium && (
                <div className="metadata-item">
                  <strong>Technique:</strong> {artwork.medium}
                </div>
              )}
              
              {artwork.department && (
                <div className="metadata-item">
                  <strong>Département:</strong> {artwork.department}
                </div>
              )}
              
              {artwork.culture && (
                <div className="metadata-item">
                  <strong>Culture:</strong> {artwork.culture}
                </div>
              )}
              
              {artwork.period && (
                <div className="metadata-item">
                  <strong>Période:</strong> {artwork.period}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;

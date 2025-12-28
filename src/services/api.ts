import axios from 'axios';
import { Artwork, SearchResult } from '../types/artwork';

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const searchArtworks = async (query: string): Promise<SearchResult> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        q: query,
        hasImages: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching artworks:', error);
    return { total: 0, objectIDs: [] };
  }
};

export const getArtworkDetails = async (objectID: number): Promise<Artwork> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/objects/${objectID}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching artwork details for ID ${objectID}:`, error);
    throw new Error('Failed to fetch artwork details');
  }
};

export const getDepartments = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/departments`);
    return response.data.departments.map((dept: any) => dept.displayName);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};
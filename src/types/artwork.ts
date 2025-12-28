export interface Artwork {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImage: string;
  objectDate: string;
  department: string;
  objectName: string;
  medium: string;
  culture: string;
  period: string;
}

export interface SearchResult {
  total: number;
  objectIDs: number[];
}

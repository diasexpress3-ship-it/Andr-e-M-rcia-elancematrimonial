
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export type StorageKey = 'wedding_cover' | 'wedding_moment' | 'wedding_location';

export interface ImageStorage {
  [key: string]: string | null;
}

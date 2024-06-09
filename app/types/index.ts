export type GameCell = { x: number; y: number };

export type User = {
  id: number;
  name: string;
  score: number;
  createdAt: string;
};

export type LoadedImages = {
  [key: string]: HTMLImageElement;
};

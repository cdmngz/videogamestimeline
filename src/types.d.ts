export type Game = {
  name: string;
  year: number;
  console: string;
  src: string;
};

export interface GameList {
  [year: number]: {
    games: Game[];
    even: boolean;
  };
}

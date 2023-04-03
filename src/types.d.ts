export type Game = {
  name: string;
  year: number;
  console: string;
  src: string;
};

export interface GameList {
  [key: number]: {
    data: Game[];
    even: boolean | null;
  };
}

export type Position = {
    x: number;
    y: number;
}

export type Wall = {
    playerId: string;
    position: Position;
    orientation: Orientation;
};

export type Orientation = "horizontal" | "vertical";

export type GameState = {
    board : string[][];
    players: Position[];
    walls: Wall[];
    currentPlayer: number;
    winner: number | null;
};
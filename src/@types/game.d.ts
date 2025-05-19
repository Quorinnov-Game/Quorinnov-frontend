export type Position = {
    x: number;
    y: number;
}

export type Wall = {
    playerId: id;
    position: Position;
    orientation: Orientation;
    isValid?: boolean | false;
};

export type Orientation = "horizontal" | "vertical";

export type GameState = {
    board : string[][];
    players: Position[];
    walls: Wall[];
    currentPlayer: number;
    winner: number | null;
};
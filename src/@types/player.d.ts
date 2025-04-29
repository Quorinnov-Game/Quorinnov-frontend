export type Player = {
    id: number;
    name?: string;
    color?: string;
    position?: Position;
    wallsRemaining: number;
    isWinner?: boolean;
    isPlayer?: boolean;
}
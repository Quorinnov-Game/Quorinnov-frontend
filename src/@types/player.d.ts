export type Player = {
    id: string;
    name?: string;
    color?: string;
    position?: Position;
    walls?: number;
    isWinner?: boolean;
}
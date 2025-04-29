import { Box } from "@mui/material"
import { Player } from "../../@types/player";
import PlayerShow from "../Player/PlayerShow";
import { BOARD_SIZE } from "./Board";

type SquareProps = {
    x: number,
    y: number,
    players: { P1: Player, P2: Player },
    selectedPlayer: Player | null,
    onSelectPlayer: (player: Player) => void,
    onMovePlayer: (x: number, y: number) => void,
    isValidMove?: boolean,
    turn: "P1" | "P2"
};
const Square: React.FC<SquareProps> = ({ x, y, players, selectedPlayer, onSelectPlayer, onMovePlayer, isValidMove, turn }: SquareProps) => {
    const playerHere = Object.values(players).find(player => player.position?.x === x && player?.position.y === y);
    const isYourPlayer = playerHere?.isPlayer === true;
    const isYourTurn = playerHere?.isPlayer && turn === "P1";
    const isTopOrBotRow = x === 0 || x === BOARD_SIZE - 1;

    const onAction = () => {
            isYourPlayer && isYourTurn ?
                onSelectPlayer(playerHere) : (selectedPlayer && isValidMove && onMovePlayer(x, y))
    }
    return (
        <Box
            onClick={onAction}
            sx={{
                width: "100%",
                height: "100%",
                aspectRatio: "1/1",
                border: "1px solid black",
                borderRadius: "4px",
                backgroundColor: isYourPlayer
                    ? playerHere.color
                    : isValidMove
                        ? "#FFF59D"
                        : isTopOrBotRow
                            ? "#CCCCCC"
                            : "white",
                cursor: isYourPlayer || isValidMove ? "pointer" : "default",
                boxShadow: isValidMove && !isYourPlayer
                    ? "0 0 8px #FFF59D"
                    : "none",
                transition: "all 0.2s",
                "&:hover": isYourPlayer || isValidMove ? {
                    backgroundColor: isValidMove ? "#FFEB3B" : "#f8bbd0"
                } : {},
                zIndex: 1, // to make sure the square is on top of the wall, if zIndex of square is less than wall, cannot click on square
            }}
        >
            {playerHere && (
                <PlayerShow color={playerHere.color} id={playerHere.id} wallsRemaining={playerHere.wallsRemaining}/>
            )}
        </Box>
    );
};

export default Square;
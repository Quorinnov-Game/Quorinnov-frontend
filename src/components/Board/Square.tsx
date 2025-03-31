import { Alert, Box, Dialog } from "@mui/material"
import { Player } from "../../@types/player";
import PlayerShow from "../Player/PlayerShow";

type SquareProps = {
    x: number,
    y: number,
    players: { P1: Player, P2: Player },
    selectedPlayer: Player | null,
    onSelectPlayer: (player: Player) => void,
    onMovePlayer: (x: number, y: number) => void,
    isValidMove?: boolean,
    isGameStarted: boolean,
    turn: "P1" | "P2"
};
const Square: React.FC<SquareProps> = ({ x, y, players, selectedPlayer, onSelectPlayer, onMovePlayer, isValidMove, isGameStarted, turn }: SquareProps) => {
    const playerHere = Object.values(players).find(player => player.position?.x === x && player?.position.y === y);
    const isYourPlayer = playerHere?.isPlayer === true;
    const isYourTurn = playerHere?.isPlayer && turn === "P1"

    const onAction = () => {
        if (!isGameStarted) {
            alert("You need to click 'New Game' to start playing.");
            return;
        }
        else{
            isYourPlayer && isYourTurn ?
            onSelectPlayer(playerHere) : (selectedPlayer && isValidMove && onMovePlayer(x, y))
        }
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
                backgroundColor: isYourPlayer ? playerHere.color :
                    isValidMove ? "#90caf955" : "white",
                cursor: isYourPlayer || isValidMove ? "pointer" : "default",
                "&:hover": isYourPlayer || isValidMove ? {
                    backgroundColor: isValidMove ? "#90caf9" : "#f8bbd0"
                } : {}
            }}
        >
            {playerHere && (
                <PlayerShow color={playerHere.color} id={playerHere.id} />
            )}
        </Box>
    );
};

export default Square;
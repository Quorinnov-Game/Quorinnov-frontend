import { Box } from "@mui/material"
import { Player } from "../../@types/player";
import PlayerShow from "../Player/PlayerShow";

type SquareProps = {
    x: number,
    y: number,
    player: Player,
    selectedPlayer: Player | null,
    onSelectPlayer: (player: Player) => void,
    onMovePlayer: (x: number, y: number) => void;
    isValidMove?: boolean;
};
const Square: React.FC<SquareProps> = ({x, y, player, selectedPlayer, onSelectPlayer, onMovePlayer, isValidMove} : SquareProps) => {
    const isPlayerHere = player.position.x === x && player.position.y === y;
    return (
        <Box
            onClick={() => isPlayerHere ? onSelectPlayer(player) : (isValidMove && onMovePlayer(x, y))}
            sx={{
                width: "100%",
                height: "100%",
                aspectRatio: "1/1",
                border: "1px solid black",
                borderRadius: "4px",
                backgroundColor: isPlayerHere ? player.color :
                                  isValidMove ? "#90caf955" : "white",
                cursor: isPlayerHere || isValidMove ? "pointer" : "default",
                "&:hover": isPlayerHere || isValidMove ? {
                    backgroundColor: isValidMove ? "#90caf9" : "#f8bbd0"
                } : {}
            }}
        >
            {isPlayerHere && (
                <PlayerShow color={player.color} id={player.id}/>
            )}
        </Box>
    );
};

export default Square;
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
};
const Square: React.FC<SquareProps> = ({x, y, player, selectedPlayer, onSelectPlayer, onMovePlayer} : SquareProps) => {
    const isPlayerHere = player.position.x === x && player.position.y === y;
    return (
        <Box
            key={`${x}-${y}`}
            onClick={() => isPlayerHere ? onSelectPlayer(player) : selectedPlayer && onMovePlayer(x, y)}
            sx={{
                width: "100%",
                height: "100%",
                aspectRatio: "1/1",
                border: "1px solid black",
                borderRadius: "4px",
                backgroundColor: "white",
                cursor: onclick ? "pointer" : "default",
                "&:hover": onclick && {
                    backgroundColor: "#e0e0e0",
                },
            }}
        >
            {isPlayerHere && (
                <PlayerShow color={player.color} id={player.id}/>
            )}
        </Box>
    );
};

export default Square;
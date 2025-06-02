import { Box } from "@mui/material";
import { Player } from "../../@types/player";
import { BOARD_SIZE } from "./Board";
import pandas from "../../assets/img/pandas.png";

type SquareProps = {
    x: number;
    y: number;
    players: { P1: Player; P2: Player };
    selectedPlayer: Player | null;
    onSelectPlayer: (player: Player) => void;
    onMovePlayer: (x: number, y: number) => void;
    isValidMove?: boolean;
    turn: "P1" | "P2";
};


const Square: React.FC<SquareProps> = ({
    x,
    y,
    players,
    selectedPlayer,
    onSelectPlayer,
    onMovePlayer,
    isValidMove,
    turn,
}) => {
    const playerHere = Object.values(players).find(
        (player) => player.position?.x === x && player.position?.y === y
    );
    const isYourPlayer = playerHere?.isPlayer === true;
    const isTopOrBotRow = x === 0 || x === BOARD_SIZE - 1;

    const onPlaceToDirection = () => {
        if (playerHere && isYourPlayer) {
            onSelectPlayer(playerHere);
        } else if (selectedPlayer && isValidMove) {
            onMovePlayer(x, y);
        }
    };

    return (
        <Box
            onClick={onPlaceToDirection}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPlaceToDirection();
                }
            }}
            sx={{
                width: "100%",
                height: "100%",
                aspectRatio: "1/1",
                border: "1px solid black",
                borderRadius: "4px",
                backgroundColor: isYourPlayer
                    ? playerHere?.color
                    : isValidMove
                    ? "#FFF59D"
                    : isTopOrBotRow
                    ? "#c8e6c9"
                    : "white",
                cursor: isYourPlayer || isValidMove ? "pointer" : "default",
                boxShadow:
                    isValidMove && !isYourPlayer ? "0 0 8px #FFF59D" : "none",
                transition: "all 0.2s",
                "&:hover":
                    isYourPlayer || isValidMove
                        ? {
                              backgroundColor: "#FFEB3B",
                          }
                        : {},
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {playerHere && (
                <img
                    src={pandas}
                    alt={playerHere === players.P1 ? "Player 1" : "Player 2"}
                    style={{ width: "100%", height: "100%" }}
                />
            )}
        </Box>
    );
};

export default Square;

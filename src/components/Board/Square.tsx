import { Box } from "@mui/material";
import { Player } from "../../@types/player";
import { BOARD_SIZE } from "./Board";
import pandas from "../../assets/img/pandas.png";

/**
 * Composant représentant une case du plateau
 * @description
 * Gère l'affichage et l'interaction avec une case:
 * - Affichage des joueurs
 * - Mise en évidence des déplacements possibles
 * - Gestion des clics pour la sélection/déplacement
 */

type SquareProps = {
    x: number;
    y: number;
    players: { P1: Player; P2: Player };
    selectedPlayer: Player | null;
    onSelectPlayer: (player: Player) => void;
    onMovePlayer: (x: number, y: number) => void;
    isValidMove?: boolean;
};


const Square: React.FC<SquareProps> = ({
    x,
    y,
    players,
    selectedPlayer,
    onSelectPlayer,
    onMovePlayer,
    isValidMove,
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
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "4px",
                backgroundColor: isYourPlayer
                    ? `${playerHere?.color}CC`
                    : isValidMove
                        ? "rgba(255, 255, 0, 0.3)"
                        : isTopOrBotRow
                            ? "rgba(200, 230, 201, 0.4)"
                            : "rgba(255, 255, 255, 0.1)",
                cursor: isYourPlayer || isValidMove ? "pointer" : "default",
                boxShadow: isValidMove && !isYourPlayer
                    ? "0 0 12px rgba(255, 255, 0, 0.5)"
                    : "0 0 5px rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": isYourPlayer || isValidMove
                    ? {
                        backgroundColor: "rgba(255, 255, 0, 0.5)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 5px 15px rgba(255, 255, 0, 0.6)",
                        zIndex: 2,
                    }
                    : {},
                backdropFilter: "blur(5px)",
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

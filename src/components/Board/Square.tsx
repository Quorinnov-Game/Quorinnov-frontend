import { Box } from "@mui/material"
import { Player } from "../../@types/player";
import { BOARD_SIZE } from "./Board";
import pandas from "../../assets/img/pandas.png";

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

/**
 * Square component
 * @param x - The x position of the square
 * @param y - The y position of the square
 * @param players - The players on the board
 * @param selectedPlayer - The selected player
 * @param onSelectPlayer - The function to call when the player is selected
 * @param onMovePlayer - The function to call when the player is moved
 * @param isValidMove - If true, the move is valid
 * @param turn - The current turn
 * @returns Square component
 * @description The Square component is used to display a square on the board.
 * It contains the player on the square.
 */
const Square: React.FC<SquareProps> = ({ x, y, players, selectedPlayer, onSelectPlayer, onMovePlayer, isValidMove, turn }: SquareProps) => {
    const playerHere = Object.values(players).find(player => player.position?.x === x && player?.position.y === y);
    const isYourPlayer = playerHere?.isPlayer === true;
    const isTopOrBotRow = x === 0 || x === BOARD_SIZE - 1;

    const onPlaceToDirection = () => {
        if (!!playerHere && isYourPlayer) {
            onSelectPlayer(playerHere);
        } else if (selectedPlayer && isValidMove) {
            onMovePlayer(x, y);
        }
    }
    return (
        <Box
            onClick={onPlaceToDirection}
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
                            ? "#c8e6c9"
                            : "white",
                cursor: isYourPlayer || isValidMove ? "pointer" : "default",
                boxShadow: isValidMove && !isYourPlayer
                    ? "0 0 8px #FFF59D"
                    : "none",
                transition: "all 0.2s",
                "&:hover": isYourPlayer || isValidMove ? {
                    backgroundColor: "#FFEB3B"
                } : {},
                zIndex: 1, // to make sure the square is on top of the wall, if zIndex of square is less than wall, cannot click on square
            }}
        >
            {players.P1.position.x === x && players.P1.position.y === y && (
                <img
                    src={pandas}
                    alt="Player 1"
                    style={{ width: '100%', height: '100%' }}
                />
            )}
            {players.P2.position.x === x && players.P2.position.y === y && (
                <img
                    src={pandas}
                    alt="Player 2"
                    style={{ width: '100%', height: '100%' }}
                />
            )}
        </Box>
    );
};

export default Square;
import { Box } from "@mui/material";
import { Wall } from "../../@types/game";
import { GAP_CELLULE, GRID_SIZE, HORIZONTAL, PADDING_BOARD } from "./Board";

type WallFixProps = {
    wall: Wall;
    isTemporary?: boolean;
}

/**
 * WallFix component is used to display a wall on the board
 * @param wall - The wall to display
 * @param isTemporary - If true, the wall is displayed as a temporary wall
 * @returns WallFix component
 * @description The WallFix component is used to display a wall on the board.
 * It contains the temporary wall and the wall fixed on the board.
 */
const WallFix: React.FC<WallFixProps> = ({ wall, isTemporary = false }) => {
    const cellSize = GRID_SIZE + GAP_CELLULE;

    return (
        /**Noted:
         * Ajustez la taille du mur pour qu'elle corresponde à la rainure entre les 2 carrés. 
         * Pour les murs horizontaux, la gauche ajoute le remplissage de la grille, 
         * et pour les murs verticaux, ajustez le haut.
         */
        <Box
            sx={{
                position: "absolute",
                top: wall.orientation === HORIZONTAL
                    ? `${wall.position.y * cellSize}px`
                    : `${wall.position.y * cellSize + PADDING_BOARD}px`, // Noted
                left: wall.orientation === HORIZONTAL
                    ? `${wall.position.x * cellSize + PADDING_BOARD}px`
                    : `${wall.position.x * cellSize}px`,
                width: wall.orientation === HORIZONTAL ? `${GRID_SIZE * 2 + GAP_CELLULE}px` : `${PADDING_BOARD}px`,
                height: wall.orientation === HORIZONTAL ? PADDING_BOARD : `${GRID_SIZE * 2 + GAP_CELLULE}px`,
                backgroundColor: isTemporary ? "rgba(121, 85, 72, 0.5)" : "#795548",
                borderRadius: "2px",
                boxShadow: isTemporary ? "none" : "0 0 2px rgba(0,0,0,0.5)",
            }}
        />
    );

}

export default WallFix;
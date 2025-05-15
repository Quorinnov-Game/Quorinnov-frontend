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
                borderRadius: "2px",
                background: isTemporary ? "rgba(139, 191, 92, 0.8)" : wall.orientation === HORIZONTAL ? `
                        linear-gradient(180deg, #a3d977 25%, #8bbf5c 25%, #8bbf5c 50%, #a3d977 50%, #a3d977 75%, #8bbf5c 75%, #8bbf5c 100%),
                        linear-gradient(90deg, #8bbf5c 25%, #a3d977 25%, #a3d977 50%, #8bbf5c 50%, #8bbf5c 75%, #a3d977 75%, #a3d977 100%)
                    `
                    : `
                        linear-gradient(90deg, #a3d977 25%, #8bbf5c 25%, #8bbf5c 50%, #a3d977 50%, #a3d977 75%, #8bbf5c 75%, #8bbf5c 100%),
                        linear-gradient(180deg, #8bbf5c 25%, #a3d977 25%, #a3d977 50%, #8bbf5c 50%, #8bbf5c 75%, #a3d977 75%, #a3d977 100%)
                    `,
                // backgroundColor: isTemporary ? "rgba(139, 191, 92, 0.5)" : '#8bbf5c',
            }}
        />
    );

}

export default WallFix;
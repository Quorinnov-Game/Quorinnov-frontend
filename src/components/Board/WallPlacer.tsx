import { Box } from "@mui/material";
import { Wall } from "../../@types/game";
import { BOARD_SIZE, GAP_CELLULE, GRID_SIZE, HORIZONTAL, VERTICAL } from "./Board";
import React from "react";

type WallPlacerProps = {
    playerId: number;
    onPlaceWall: (wall: Wall) => void;
    walls: Wall[];
}

/**
 * WallPlacer component
 * @param playerId - The id of the player
 * @param walls - The walls already placed on the board
 * @param onPlaceWall - The function to call when the player places a wall
 * @returns WallPlacer component
 * @description The WallPlacer component is used to display a wall available on the board.
 * It allows the player to place a wall on the board by clicking on the wall.
 * The wall is displayed as a transparent box that changes color when hovered.
 * The wall is placed on the board when the player clicks on it.
 */
const WallPlacer: React.FC<WallPlacerProps> = ({ playerId, walls, onPlaceWall }) => {
    const [hoveredHorizontal, setHoveredHorizontal] = React.useState<Wall | null>(null);
    const [hoveredVertical, setHoveredVertical] = React.useState<Wall | null>(null);

    const cellSize = GRID_SIZE + GAP_CELLULE;

    /**
     * Vérifie si un mur croise un autre mur
     * @param wall - Le mur à vérifier
     * @returns boolean - Vrai si le mur croise un autre mur
     */
    const isWallCrossing = (wall: Wall) => {
        // Vérifiez si le mur croise un autre mur
        return walls.some(existingWall =>
            (
                wall.orientation !== existingWall.orientation &&
                wall.position.x === existingWall.position.x &&
                wall.position.y === existingWall.position.y
            ) ? true : false
        );
    }

    /**
     * Vérifie si un mur est adjacent ou superposé à un autre mur
     * @param wall - Le mur à vérifier
     * @returns boolean - Vrai si le mur est adjacent ou superposé à un autre mur
     */
    const isOverlappingWall = (wall: Wall) => {
        // Vérifiez si le mur est adjacent ou superposé à un autre mur
        return walls.some(existingWall =>
            existingWall.orientation === wall.orientation &&
            (wall.orientation === HORIZONTAL
                ? (
                    // Vérifiez si le mur horizontal est trop proche d'un autre mur horizontal
                    existingWall.position.x === wall.position.x &&
                    Math.abs(existingWall.position.y - wall.position.y) <= 1
                )
                : (
                    // Vérifiez si le mur vertical est trop proche d'un autre mur vertical
                    existingWall.position.y === wall.position.y &&
                    Math.abs(existingWall.position.x - wall.position.x) <= 1
                )
            )
        );
    };

    const handleClickWall = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();

        // Calculer la position de la souris par rapport à la grille
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        // Coordonnées x,y == (0,0) à partir du coin aigu supérieur gauche du tableau
        const cellX = Math.floor(mouseY / cellSize);
        const cellY = Math.floor(mouseX / cellSize);

        // Calculer le décalage pour vérifier l'espace entre 2 cellules
        const offsetX = mouseX % cellSize;
        const offsetY = mouseY % cellSize;

        // Condition de vérification de l'écart
        const isInHorizontalGap = offsetY > 0 && offsetY < GAP_CELLULE / 2;
        const isInVerticalGap = offsetX > 0 && offsetX < GAP_CELLULE / 2;

        // La coordonnée x doit être réduite d'une unité s'il s'agit d'un mur horizontal,
        // la coordonnée y doit être réduite d'une unité s'il s'agit d'un mur vertical.
        const x = cellX - (isInHorizontalGap ? 1 : 0);
        const y = cellY - (isInVerticalGap ? 1 : 0);

        // Vérifiez si le mur est dans les limites de la grille
        // Les murs horizontaux (0<=x<=7, 0<=y<=7)
        // Les murs verticaux (0<=x<=7, 0<=y<=7)
        const validHorizontal = isInHorizontalGap && x >= 0 && x <= BOARD_SIZE - 2 && y >= 0 && y <= BOARD_SIZE - 2;
        const validVertical = isInVerticalGap && y >= 0 && y <= BOARD_SIZE - 2 && x >= 0 && x <= BOARD_SIZE - 2;

        // Vérifiez si le mur est valide
        if (validHorizontal) {
            const wallHorizontal: Wall = {
                position: { x, y },
                orientation: HORIZONTAL,
                playerId: playerId,
            };
            if (!isOverlappingWall(wallHorizontal) && !isWallCrossing(wallHorizontal)) {
                setHoveredHorizontal(wallHorizontal);
            } else {
                setHoveredHorizontal(null);
            }
        } else if (validVertical) {
            const wallVertical: Wall = {
                position: { x, y },
                orientation: VERTICAL,
                playerId: playerId,
            };
            if (!isOverlappingWall(wallVertical) && !isWallCrossing(wallVertical)) {
                setHoveredVertical(wallVertical);
            } else {
                setHoveredVertical(null);
            }
        }

        else {
            setHoveredHorizontal(null);
            setHoveredVertical(null);
        }
    }

    const handleClick = () => {
        if (hoveredHorizontal) {
            onPlaceWall(hoveredHorizontal);
        }
        if (hoveredVertical) {
            onPlaceWall(hoveredVertical);
        }
    }

    return (
        <Box
            onMouseMove={handleClickWall}
            onClick={handleClick}
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
            }}
        >
            {!!hoveredHorizontal && (
                <Box
                    sx={{
                        position: "absolute",
                        top: `${(hoveredHorizontal.position.x + 1) * cellSize}px`,
                        left: `${hoveredHorizontal.position.y * cellSize + 8}px`,
                        width: `${GRID_SIZE * 2 + GAP_CELLULE}px`,
                        height: "8px",
                        backgroundColor: "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(139, 191, 92, 0.5)",
                            cursor: "pointer"
                        },
                        pointerEvents: "auto",
                    }}
                />
            )}

            {!!hoveredVertical && (
                <Box
                    sx={{
                        position: "absolute",
                        top: `${hoveredVertical.position.x * cellSize + 8}px`,
                        left: `${(hoveredVertical.position.y + 1) * cellSize}px`,
                        height: `${GRID_SIZE * 2 + GAP_CELLULE}px`,
                        width: "8px",
                        backgroundColor: "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(139, 191, 92, 0.5)",
                            cursor: "pointer"
                        },
                        pointerEvents: "auto",
                    }}
                />
            )}
        </Box>
    );
};

export default WallPlacer;
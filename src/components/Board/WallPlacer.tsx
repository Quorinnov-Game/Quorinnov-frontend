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

    const isWallCrossing = (wall: Wall) => {
        // Vérifiez si le mur croise un autre mur
        return walls.some(existingWall => {
            if (wall.orientation === HORIZONTAL && existingWall.orientation === VERTICAL) {
                // Vérifiez si le mur horizontal croise un mur vertical
                return (
                    (wall.position.x === existingWall.position.x - 1 &&
                        wall.position.y === existingWall.position.y + 1)
                );
            } else if (wall.orientation === VERTICAL && existingWall.orientation === HORIZONTAL) {
                // Vérifiez si le mur vertical croise un mur horizontal
                return (
                    (wall.position.x === existingWall.position.x + 1 &&
                        wall.position.y === existingWall.position.y - 1)
                );
            }
            return false;
        });
    }

    const isWallTooClose = (wall: Wall) => {
        // Vérifiez si le mur est trop proche d'un autre mur
        return walls.some(existingWall => {
            if (existingWall.orientation === wall.orientation) {
                if (wall.orientation === HORIZONTAL) {
                    // Vérifiez si le mur horizontal est trop proche d'un autre mur horizontal
                    return (
                        existingWall.position.y === wall.position.y &&
                        Math.abs(existingWall.position.x - wall.position.x) === 1
                    );
                } else if (wall.orientation === VERTICAL) {
                    // Vérifiez si le mur vertical est trop proche d'un autre mur vertical
                    return (
                        existingWall.position.x === wall.position.x &&
                        Math.abs(existingWall.position.y - wall.position.y) === 1
                    );
                }
            }
            return false;
        }
        );
    };

    const handleClickWall = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        console.log("rect", rect)
        const mouseX = event.clientX - rect.left;
        console.log("mouseX", mouseX)
        const mouseY = event.clientY - rect.top;
        console.log("mouseY", mouseY)
        // Calculer la position du mur en fonction des coordonnées de la souris
        const x = Math.floor(mouseX / cellSize);
        console.log("x", x)
        const y = Math.floor(mouseY / cellSize);
        console.log("y", y)

        // Vérifiez si la souris se trouve dans la zone vide entre les carrés
        const offsetX = mouseX % cellSize;
        console.log("offsetX", offsetX)
        const offsetY = mouseY % cellSize;
        console.log("offsetY", offsetY)


        // Vérifiez si la souris se trouve dans la zone vide entre les carrés
        const isInHorizontalGap = offsetX > 0 && offsetX < cellSize && offsetY > 0 && offsetY < GAP_CELLULE / 2;
        console.log("isInHorizontalGap", isInHorizontalGap)
        const isInVerticalGap = offsetY > 0 && offsetY < cellSize && offsetX > 0 && offsetX < GAP_CELLULE / 2;
        console.log("isInVerticalGap", isInVerticalGap)

        // Évitez les murs hors limites
        // Les rainures murales sont situées dans la première et la dernière rangée (y = 0 et y = 8)
        // Les emplacements muraux sont situés dans la première et la dernière colonne (x = 0 et x = 8)
        // Ne peut pas être placé au début de la dernière colonne (x = 8 et x = 9)
        if (isInHorizontalGap && x >= 0 && x < BOARD_SIZE - 1 && y > 0 && y < BOARD_SIZE) {
            const wallHorizontal: Wall = {
                position: { x, y },
                orientation: HORIZONTAL,
                playerId: playerId,
            };
            if (!isWallTooClose(wallHorizontal) && !isWallCrossing(wallHorizontal)) {
                setHoveredHorizontal(wallHorizontal);
            }
            else {
                setHoveredHorizontal(null);
            }
        }

        else if (isInVerticalGap && y >= 0 && y < BOARD_SIZE - 1 && x > 0 && x < BOARD_SIZE) {
            const wallVertical: Wall = {
                position: { x, y },
                orientation: VERTICAL,
                playerId: playerId,
            };
            if (!isWallTooClose(wallVertical) && !isWallCrossing(wallVertical)) {
                setHoveredVertical(wallVertical);
            }
            else {
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
                        top: `${hoveredHorizontal.position.y * cellSize}px`,
                        left: `${hoveredHorizontal.position.x * cellSize + 8}px`,
                        width: `${GRID_SIZE * 2 + GAP_CELLULE}px`,
                        height: "8px",
                        backgroundColor: "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(121, 85, 72, 0.3)",
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
                        top: `${hoveredVertical.position.y * cellSize + 8}px`,
                        left: `${hoveredVertical.position.x * cellSize}px`,
                        height: `${GRID_SIZE * 2 + GAP_CELLULE}px`,
                        width: "8px",
                        backgroundColor: "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(121, 85, 72, 0.3)",
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
import { Box, Typography, Paper } from "@mui/material";
import winImg from "../assets/img/Win.png"
import blockImg from "../assets/img/Block.png"
import emplacementImg from "../assets/img/Emplacement1.png"
import cannotBloqueImg from "../assets/img/CannotBloque.png"
import jumpImg from "../assets/img/Jump.png"

const Rules: React.FC = () => {
    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    zIndex: -1,
                }}
            />

            <Box maxWidth="800px" mx="auto" p={4}>
                <Typography variant="h3" fontWeight="bold" mb={4} textAlign="center">
                    Les règles de Quoridor
                </Typography>

                <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#f8f8f8' }}>
                    <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap={2}>

                        {/* Section 1 */}
                        <Box width={{ xs: '100%', sm: '45%' }} textAlign="center">
                            <img src={winImg} alt="Objectif" width="100%" style={{ borderRadius: 8, marginBottom: 8 }} />
                            <Typography variant="h6" fontWeight="medium" gutterBottom>Objectif</Typography>
                            <Typography variant="body2">Atteignez l'autre côté plus vite que votre adversaire.</Typography>
                        </Box>

                        {/* Section 2 */}
                        <Box width={{ xs: '100%', sm: '45%' }} textAlign="center">
                            <img src={emplacementImg} alt="Déplacement" width="100%" style={{ borderRadius: 8, marginBottom: 8 }} />
                            <Typography variant="h6" fontWeight="medium" gutterBottom>Déplacer votre pion</Typography>
                            <Typography variant="body2">Vous pouvez déplacer votre pion vers le haut, bas, gauche ou droite.</Typography>
                        </Box>

                        {/* Section 3 */}
                        <Box width={{ xs: '100%', sm: '45%' }} textAlign="center">
                            <img src={blockImg} alt="Mur" width="100%" style={{ borderRadius: 8, marginBottom: 8 }} />
                            <Typography variant="h6" fontWeight="medium" gutterBottom>Placer des murs</Typography>
                            <Typography variant="body2">Utilisez vos murs stratégiquement pour bloquer votre adversaire.</Typography>
                        </Box>

                        {/* Section 4 */}
                        <Box width={{ xs: '100%', sm: '45%' }} textAlign="center">
                            <img src={cannotBloqueImg} alt="Mur" width="100%" style={{ borderRadius: 8, marginBottom: 8 }} />
                            <Typography variant="h6" fontWeight="medium" gutterBottom>Placer des murs</Typography>
                            <Typography variant="body2">Vous ne pouvez pas bloquer totalement le chemin vers la ligne opposée.</Typography>
                        </Box>


                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default Rules;

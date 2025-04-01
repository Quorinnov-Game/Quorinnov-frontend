import { Box, Divider, Typography } from "@mui/material";
import winImg from "../assets/img/Win.png"
import blockImg from "../assets/img/Block.png"
import emplacementImg from "../assets/img/Emplacement.png"
const Rules: React.FC = () => {
    return (
        <Box
            maxWidth="800px"
            mx="auto"
            p={4}
        >
            <Typography variant="h3" fontWeight="bold" mb={2} gutterBottom>
                Les règles de Quoridor
            </Typography>

            {/* Section 1 */}
                <Typography variant="h6" fontWeight="medium" mb={2}>1. Objective</Typography>
                <img src={winImg} alt="Moving Pawn" width="70%" style={{ borderRadius: 8, marginBottom: 16 }} />

            {/* Section 2 */}
                <Typography variant="h6" fontWeight="medium" mb={2}>2. Déplacer votre pion</Typography>
                <img src={emplacementImg} alt="Moving Pawn" width="70%" style={{ borderRadius: 8, marginBottom: 16 }} />

            {/* Section 3 */}
                <Typography variant="h6" fontWeight="medium" mb={2}>3. Placer des murs</Typography>
                <img src={blockImg} alt="Placing Wall" width="70%" style={{ borderRadius: 8, marginBottom: 16 }} />

        </Box>
    );
};

export default Rules;
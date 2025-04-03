import { Box } from "@mui/material"

const BlurBackground = () => {
    return (
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
    )
}

export default BlurBackground;
import { useLocation } from "react-router";

const BlurBackground = () => {
    const location = useLocation();
    const isBlurPage = location.pathname !== "/";

    // Check if the current page is not the home page
    if (!isBlurPage) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                backgroundColor: "rgba(0,0,0,0.3)",
                zIndex: 0, // Set the z-index to 0 to place it behind other elements
                pointerEvents: "none" // Prevent clicks on the blur background
            }}
        />
    );
}

export default BlurBackground;
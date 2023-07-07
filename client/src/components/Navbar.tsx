    /* eslint-disable @typescript-eslint/no-unused-vars */
    import { useState } from "react"
    import { Link } from "react-router-dom"
    import PixIcon from "@mui/icons-material/Pix"
    import { Box, Typography, useTheme } from "@mui/material"
    import { useThemeContext } from "@/hook/useThemeContext"
    import FlexBetween from "./FlexBetween"

    const Navbar = () => {
    const { palette } = useTheme()
    const [selected, setSelected] = useState("dashboard")

    const { toggleColorMode, mode } = useThemeContext()
    return (
        <FlexBetween mb={`0.25rem`} p={`0.5rem 0rem`} color={palette.grey[300]}>
        <div style={{ display: "none" }} onClick={toggleColorMode}>
            hello {mode}
        </div>
        {/* left side icon */}
        <FlexBetween gap={`0.75rem`}>
            <PixIcon sx={{ fontSize: "28px", color: "whitesmoke" }} />
            <Typography variant="h4" fontSize={`16px`}>
            FinApp
            </Typography>
        </FlexBetween>
        {/* right side */}
        <FlexBetween gap={`2rem`} >
            <Box sx={{ "&:hover": { color: palette.grey[100] } }}>
            <Link
                onClick={() => setSelected("dashboard")}
                to={"/"}
                style={{
                color: selected == "dashboard" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
                }}
            >
                dashboard
            </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.grey[100] } }}>
            <Link
                onClick={() => setSelected("predictions")}
                to={"/predictions"}
                style={{
                color: selected == "predictions" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
                }}
            >
                predictions
            </Link>
            </Box>
        </FlexBetween>
        </FlexBetween>
    )
    }

    export default Navbar

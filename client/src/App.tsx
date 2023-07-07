import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useMemo, useState } from "react"
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

import { themeSettings } from "@/theme"
import Dashboardlayout from "@/components/layout/Dashboardlayout"
import { Box, PaletteMode, useTheme } from "@mui/material"
import { useThemeContext } from "./hook/useThemeContext"
import { ThemeContext } from "./Context/ThemeContextProvider"
import Dashboard from "./pages/Dashboard"
import Predictions from "./pages/Predictions"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Dashboardlayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/predictions" element={<Predictions />} />
      </Route>
    </>
  )
)

function App() {
  const { theme } = useThemeContext()
  // const { palette } = useTheme()
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App

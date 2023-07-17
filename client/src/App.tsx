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

import Dashboard from "./pages/Dashboard"
import Predictions from "./pages/Predictions"
import Table from "./pages/Table"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Dashboardlayout />}>
        <Route index element={<Table/>} />
        <Route path="/dashboard"  element={<Dashboard />}/>
        <Route path="/predictions" element={<Predictions />} />
      </Route>
    </>
  )
)

function App() {
  // const { theme } = useThemeContext()
  const theme = useMemo(() => createTheme(themeSettings), [])
  // const theme = useTheme()
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

import { createTheme, PaletteMode, Theme } from "@mui/material"
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react"
import { themeSettings,getDesignTokens } from "@/theme"

type ThemeContextType = {
  mode: string
  toggleColorMode: () => void
  theme: Theme
}

export const ThemeContext = createContext<ThemeContextType>({
  //   mode: "light",
  //   toggleColorMode: () => {},
  //   theme: createTheme(themeSettings),
} as ThemeContextType)

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("dark")
  const theme = useMemo(
    () =>
      createTheme({
        ...themeSettings,
        palette: { ...themeSettings.palette, mode },
      }),
    [mode]
  )
// const theme = useMemo(
//     () => createTheme(getDesignTokens(mode)),
//     [mode]
//   );
  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

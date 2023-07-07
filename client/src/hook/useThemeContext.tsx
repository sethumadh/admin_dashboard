import { ThemeContext } from "@/Context/ThemeContextProvider"
import { useContext } from "react"

export const useThemeContext = () => {
  return useContext(ThemeContext)
}

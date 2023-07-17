import { Row1, Row2} from "@/components"
import {
  gridTemplateSmallScreens,
  gridTemplateLargeScreens,
} from "@/constants/gridTemplates"
import { Box, useMediaQuery } from "@mui/material"

function Dashboard() {
  const isAboveMediaScreens = useMediaQuery("(min-width:1000px)")
  return (
    <>
      <Box
      // mt={`50px`}
        width="100%"
        height={`100%`}
        display={`grid`}
        gap={`2.5rem`}
        sx={
          isAboveMediaScreens
            ? {
                gridTemplateColumns: "repeat(3,minmax(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreens,
              }
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "80px",
                gridTemplateAreas: gridTemplateSmallScreens,
              }
        }
      >
        <Row1 />
        <Row2 />
        {/* <Row3 /> */}
      </Box>
    </>
  )
}

export default Dashboard

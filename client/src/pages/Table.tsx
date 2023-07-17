import { useEffect, useMemo, useState } from "react"
import { Avatar, Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import { DataGrid, gridClasses, GridCellParams } from "@mui/x-data-grid"
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/redux/services"
import { dateFormat } from "@/helper/functions/dateFormatter"
import {
  gridTemplateSmallScreens,
  gridTemplateLargeScreens,
} from "@/constants/GridTemplatesTable"
import { DashboardBox } from "@/components"
import BoxHeader from "@/components/BoxHeader"
import TablePie from "@/components/charts/TablePie"
import TableSummary from "@/components/charts/TableSummary"

const Table = () => {
  const isAboveMediaScreens = useMediaQuery("(min-width:1000px)")
  const { palette } = useTheme()
  const { data: kpiData } = useGetKpisQuery()
  const { data: productData } = useGetProductsQuery()
  const { data: transactionData } = useGetTransactionsQuery()
  console.log(kpiData)
  const columns = useMemo(
    () => [
      { field: "_id", headerName: "ID", flex: 1 },
      { field: "buyer", headerName: "Buyer", flex: 1 },
      {
        field: "amount",
        headerName: "Amount",
        flex: 1,
        renderCell: (params: GridCellParams) => `$${params.value}`,
      },
      {
        field: "updatedAt",
        headerName: "Time",
        flex: 1,
        renderCell: (params: GridCellParams) => dateFormat(params.value),
      },
    ],
    []
  )
  return (
    <>
      <Box>
        <Typography
          variant="h3"
          component={`h3`}
          sx={{
            color: "white",
            textAlign: { xs: "center", md: "left" },
            marginTop: "30px",
          }}
        >
          Summary
        </Typography>
        <Box
          mt={`30px`}
          mb={`50px`}
          width="100%"
          height={`100%`}
          display={`grid`}
          gap={`2.5rem`}
          sx={
            isAboveMediaScreens
              ? {
                  gridTemplateColumns: "repeat(3,minmax(370px, 1fr))",
                  gridTemplateRows: "repeat(2, minmax(60px, 1fr))",
                  gridTemplateAreas: gridTemplateLargeScreens,
                }
              : {
                  gridAutoColumns: "1fr",
                  gridAutoRows: "80px",
                  gridTemplateAreas: gridTemplateSmallScreens,
                }
          }
        >
          <DashboardBox gridArea={`a`} style={{ padding: "5px" }}>
            <Box marginBottom={"15px"}>
              <BoxHeader
                title="Expenses Breakdown by Category"
                subtitle="top line - revenue, bottom line - expenses"
                sideText="+4%"
              />
            </Box>
            {/* <Row1Area /> */}
            <TablePie />
          </DashboardBox>
          <DashboardBox gridArea={`b`}>
            <Box marginBottom={"15px"}>
              <BoxHeader title="Overall Summary" sideText="" />
            </Box>
            {/* <Row1Line /> */}
            <TableSummary/>
          </DashboardBox>
        </Box>
      </Box>
      {transactionData && (
        <>
          <Typography
            variant="h3"
            component={`h3`}
            sx={{
              color: "white",
              textAlign: { xs: "center", md: "left" },
              marginBottom: "30px",
            }}
          >
            Recent 250 Business Transactions
          </Typography>
          <Box
            sx={{
              height: 600,
              width: "100%",
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: "none",
              },
              "& .MuiToolbar-root": {
                color: palette.grey[200],
                border: `none`,
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden",
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row.id}
              columnHeaderHeight={25}
              rowHeight={35}
              columns={columns}
              rows={transactionData}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default Table

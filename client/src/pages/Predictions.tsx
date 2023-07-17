import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import { useGetKpisQuery } from "@/redux/services"
import { Box, Button, Typography, useTheme } from "@mui/material"
import React, { useMemo, useState } from "react"
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import regression, { DataPoint } from "regression"
const fData = [
  {
    name: "january",
    "Actual Revenue": 160,
    "Regression Line": 160,
    "Predicted Revenue": 209,
  },
  {
    name: "february",
    "Actual Revenue": 158,
    "Regression Line": 164,
    "Predicted Revenue": 214,
  },
  {
    name: "march",
    "Actual Revenue": 165,
    "Regression Line": 168,
    "Predicted Revenue": 218,
  },
  {
    name: "april",
    "Actual Revenue": 182,
    "Regression Line": 172,
    "Predicted Revenue": 222,
  },
  {
    name: "may",
    "Actual Revenue": 174,
    "Regression Line": 176,
    "Predicted Revenue": 226,
  },
  {
    name: "june",
    "Actual Revenue": 183,
    "Regression Line": 181,
    "Predicted Revenue": 230,
  },
  {
    name: "july",
    "Actual Revenue": 193,
    "Regression Line": 185,
    "Predicted Revenue": 234,
  },
  {
    name: "august",
    "Actual Revenue": 166,
    "Regression Line": 189,
    "Predicted Revenue": 238,
  },
  {
    name: "september",
    "Actual Revenue": 193,
    "Regression Line": 193,
    "Predicted Revenue": 242,
  },
  {
    name: "october",
    "Actual Revenue": 212,
    "Regression Line": 197,
    "Predicted Revenue": 247,
  },
  {
    name: "november",
    "Actual Revenue": 227,
    "Regression Line": 201,
    "Predicted Revenue": 251,
  },
  {
    name: "december",
    "Actual Revenue": 178,
    "Regression Line": 205,
    "Predicted Revenue": 255,
  },
]
const data = [
  {
    name: "Page A",
    "Actual Revenue": 4000,
    "Regression Line": 2400,
    "Predicted Revenue": 2400,
  },
  {
    name: "Page B",
    "Actual Revenue": 3000,
    "Regression Line": 1398,
    "Predicted Revenue": 2210,
  },
  {
    name: "Page C",
    "Actual Revenue": 2000,
    "Regression Line": 9800,
    "Predicted Revenue": 2290,
  },
  {
    name: "Page D",
    "Actual Revenue": 2780,
    "Regression Line": 3908,
    "Predicted Revenue": 2000,
  },
  {
    name: "Page E",
    "Actual Revenue": 1890,
    "Regression Line": 4800,
    "Predicted Revenue": 2181,
  },
  {
    name: "Page F",
    "Actual Revenue": 2390,
    "Regression Line": 3800,
    "Predicted Revenue": 2500,
  },
  {
    name: "Page G",
    "Actual Revenue": 3490,
    "Regression Line": 4300,
    "Predicted Revenue": 9100,
  },
]

const Predictions = () => {
  const { palette } = useTheme()
  const [isPredictions, setIsPredictions] = useState(false)
  const { data: kpiData } = useGetKpisQuery()

  const formattedData = useMemo(() => {
    if (!kpiData) return []
    const monthData = kpiData[0].monthlyData

    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue]
      }
    )
    const regressionLine = regression.linear(formatted)

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": parseInt(revenue.toFixed(0)),
        "Regression Line": parseInt(regressionLine.points[i][1].toFixed(0)),
        "Predicted Revenue": parseInt(
          regressionLine.predict(i + 12)[1].toFixed(0)
        ),
      }
    })
  }, [kpiData])
  console.log(formattedData, data)

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            charted revenue and predicted revenue based on a simple linear
            regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          Show Predicted Revenue for Next Year
        </Button>
      </FlexBetween>
      {kpiData && (
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              right: 75,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
              <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <ReferenceLine y={0} stroke="#000000" />
            <YAxis
              // scale="point"
              domain={[120, 260]}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            >
              <Label
                value="Revenue in USD"
                angle={-90}
                offset={-15}
                position="insideLeft"
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}
              strokeWidth={0}
              dot={{ strokeWidth: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#8884d8"
              dot={false}
            />

         {  isPredictions && <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
            />}
          </LineChart>
        </ResponsiveContainer>
      )}
    </DashboardBox>
  )
}

export default Predictions

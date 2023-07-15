import React, { useEffect, useRef } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

type ChartRef = {
  chart: Highcharts.Chart | undefined
}
const Row2Pie = () => {
  const chartRef = useRef<ChartRef>(null)

  useEffect(() => {
    const chart = chartRef?.current?.chart

    // Update the chart data
    chart?.series[0].setData([
      { name: "Sales", y: 500 },
      { name: "Target", y: 700 },
    ])
  }, [])

  const options = {
    chart: {
      type: "pie",
      height: 180,
      width:200,
      backgroundColor: "#2d2d34",
    },
    title: {
      text: "Campaign  vs Target",
      style: {
        color: "#ffffff", // Set the title text color to white
        // font:"10px"
      },
    },
    plotOptions: {
      pie: {
        innerSize: "70%",
        dataLabels: {
          enabled: true,
          style: {
            color: "#ffffff", // Set the text color to white
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Campaign  vs Target",
        data: [],
      },
    ],
    colors: ["#006400", "#7CFC00"],
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
  )
}

export default Row2Pie

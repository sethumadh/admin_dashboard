import React from "react"
import DashboardBox from "./DashboardBox"

function Row2() {
  return (
    <>
      <DashboardBox gridArea={`e`}></DashboardBox>
      <DashboardBox gridArea={`f`}></DashboardBox>
      <DashboardBox gridArea={`c`}></DashboardBox>
    </>
  )
}

export default Row2

import React from "react"
import DashboardBox from "./DashboardBox"



const Row1 = () => {
  return (
    <>
      <DashboardBox gridArea={`a`}></DashboardBox>
      <DashboardBox gridArea={`d`}></DashboardBox>
      <DashboardBox gridArea={`b`}></DashboardBox>
    </>
  )
}

export default Row1

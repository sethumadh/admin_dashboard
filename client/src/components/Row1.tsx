import { useGetKpisQuery } from "@/redux/services"
import DashboardBox from "./DashboardBox"

const Row1 = () => {
  const {data}= useGetKpisQuery()
  console.log(data)
  return (
    <>
      <DashboardBox gridArea={`a`}></DashboardBox>
      <DashboardBox gridArea={`d`}></DashboardBox>
      <DashboardBox gridArea={`b`}></DashboardBox>
    </>
  )
}

export default Row1


import Navbar from "../Navbar"
import { Outlet } from "react-router-dom"

function Dashboardlayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Dashboardlayout

import Navbar from "../Navbar"
import { Outlet } from "react-router-dom"
import SideNavBar from "../Sidenavbar"

function Dashboardlayout() {
  return (
    <div>
      {/* <SideNavBar/> */}
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboardlayout

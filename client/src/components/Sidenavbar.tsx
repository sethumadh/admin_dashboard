import { Menu, MenuItem, Sidebar } from "react-pro-sidebar"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import icons from "@/constants/icons"
import { Avatar } from "@mui/material"

// import { icons } from "../constant"
// import { persistor, useAppSelector, useAppDispatch } from "../redux/store"
// import { setActivePath } from "../redux/features/sidebarSlice"
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
// import { logoutSuccess } from "../helper/functions/functions"
import { setActivePath } from "@/redux/sidebarSlice"
import { useAppDispatch, useAppSelector } from "@/redux/store"
function SideNavBar() {
  const location = useLocation()
  //   const dispatch = useAppDispatch()
  //   const user = useAppSelector((state) => state.user)
  const activeLink = useAppSelector((state) => state.sidebar.activePath)
  const [collapsed, setCollapsed] = useState(true)
  const navigate = useNavigate()
  //   const handleLogout = () => {
  //     persistor.purge()
  //     logoutSuccess()
  //     navigate("/login")
  //   }

  //   useEffect(() => {
  //     dispatch(setActivePath(location.pathname))
  //   }, [location, dispatch])
  return (
    <div style={{ height: "auto", display: "flex" }} className="relative">
      <Sidebar
        style={{
          height: "auto",
          backgroundColor: "white",
          marginRight: "",
          position: "fixed",
          zIndex: 999,
          display: "none",
          "@media (min-width: 768px)": { display: "block" },
        }}
        collapsed={collapsed}
        transitionDuration={400}
        className="bg-white hidden md:block"
      >
        <Menu className="min-h-screen border-r-2 bg-white">
          <MenuItem
            className="bg-white"
            icon={<icons.MenuOutlinedIcon />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ textAlign: "center" }}
          ></MenuItem>

          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            icon={
              <>
                <Avatar src="https://github.com/shadcn.png"></Avatar>
              </>
            }
            component={<Link to={`/`} />}
          >
            {/* {user.user.name} */}
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/" || activeLink.includes("student_detail")
                ? "bg-yellow-400"
                : ""
            }`}
            icon={<icons.DashboardIcon style={{ color: "gray" }} />}
            component={<Link to={`/`} />}
          >
            DashBoard
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (!collapsed) setCollapsed(!collapsed)
            }}
            className={`${
              activeLink == "/changepassword" ? "bg-yellow-400" : ""
            }`}
            icon={<icons.SettingsIcon style={{ color: "gray" }} />}
            component={<Link to={`/changepassword`} />}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              //   handleLogout()
            }}
            icon={<icons.LogoutIcon style={{ color: "gray" }} />}
            component={<Link to={`/`} />}
          >
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideNavBar

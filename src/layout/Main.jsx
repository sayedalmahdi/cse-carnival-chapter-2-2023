import { Outlet } from "react-router-dom"
import NavigationBar from "../pages/Shared/NavigationBar/NavigationBar"
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <div>
      <ToastContainer />
        <NavigationBar></NavigationBar>
        <Outlet></Outlet>
    </div>
  )
}

export default Main;
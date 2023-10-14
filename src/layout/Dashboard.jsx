import { useContext } from "react";
import {
  FaHome,
  FaRegAddressBook,
  FaRegCalendarCheck,
  FaUsers,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { Link, Outlet } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import useAdmin from "../hooks/useAdmin";
import useConsultant from "../hooks/useConsultant";
import NavigationBar from "../pages/Shared/NavigationBar/NavigationBar";
import { AuthContext } from "../provider/AuthProvider";

const Dashboard = () => {
  const { loading } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isConsultant] = useConsultant();
  const isCustomer = isAdmin == true || isConsultant == true ? false : true;
  if (loading) {
    return <RingLoader color="#36d7b7" className="text-center my-24" />;
  }
  return (
    <div className="bg-white dark:bg-slate-800">
      <ToastContainer />
      <NavigationBar></NavigationBar>
      <div className="flex lg:px-10 py-10">
        {isCustomer && (
          <div className="w-1/5 space-y-2">
            <Link to="/dashboard/customerhome">
              <button className="btn bg-[#e2136e] dark:bg-slate-900 dark:hover:bg-gray-500 w-full text-white hover:bg-gray-500 ">
                <FaHome></FaHome>Home
              </button>
            </Link>
            <Link to="/dashboard/favouriteservices">
              <button className="btn bg-[#e2136e] dark:bg-slate-900 dark:hover:bg-gray-500 w-full text-white hover:bg-gray-500">
                <SiGoogleclassroom></SiGoogleclassroom> Favourite services
              </button>
            </Link>
            <Link to="/dashboard/takenservices">
              <button className="btn bg-[#e2136e] dark:bg-slate-900 dark:hover:bg-gray-500 w-full text-white hover:bg-gray-500">
                <FaRegCalendarCheck></FaRegCalendarCheck> Previously Taken
              </button>
            </Link>
            <Link to="/dashboard/paymenthistory">
              <button className="btn bg-[#e2136e] dark:bg-slate-900 dark:hover:bg-gray-500 w-full text-white hover:bg-gray-500">
                <FaRegCalendarCheck></FaRegCalendarCheck>Payment History
              </button>
            </Link>
          </div>
        )}
        {isConsultant && (
          <div className="w-1/5 space-y-2">
            <Link to="/dashboard/consultanthome">
              <button className="btn bg-[#e2136e] w-full text-white hover:bg-gray-500">
                <FaHome></FaHome>Home
              </button>
            </Link>
            <Link to="/dashboard/myservices">
              <button className="btn bg-[#e2136e] w-full text-white hover:bg-gray-500">
                <SiGoogleclassroom></SiGoogleclassroom>My Services
              </button>
            </Link>
            {/* <Link to={`/dashboard/addservices/${user?.email}`}> */}
            <Link to="/dashboard/addservices">
              <button className="btn bg-[#e2136e] w-full text-white hover:bg-gray-500">
                Add New Service
              </button>
            </Link>
          </div>
        )}
        {isAdmin && (
          <div className="w-1/5 space-y-5">
            <Link to="/dashboard/adminhome">
              <button className="btn bg-[#e2136e] w-full text-white hover:bg-gray-500">
                <FaHome></FaHome>Home
              </button>
            </Link>
            <Link to="/dashboard/allclasses">
              <button className="btn bg-[#e2136e] w-full text-white hover:bg-gray-500">
                <FaRegAddressBook></FaRegAddressBook>All Services
              </button>
            </Link>
            <Link to="/dashboard/manageusers">
              <button className="btn bg-[#e2136e] w-full text-white hover:bg-gray-500">
                <FaUsers></FaUsers>Manage Users
              </button>
            </Link>
          </div>
        )}
        <div className="w-4/5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

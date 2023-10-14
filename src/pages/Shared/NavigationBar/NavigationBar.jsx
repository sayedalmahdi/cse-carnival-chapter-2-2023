import { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useConsultant from "../../../hooks/useConsultant";
import { AuthContext } from "../../../provider/AuthProvider";
const NavigationBar = () => {
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isConsultant] = useConsultant();
  const isCustomer = isAdmin == true || isConsultant == true ? false : true;

  const navItems = (
    <>
      <NavLink to="/" className="font-bold mx-5 my-2 md:my-0 hover:border">
        Home
      </NavLink>
      <NavLink
        to="/consultants"
        className="font-bold mx-5 my-2 md:my-0 hover:border"
      >
        Consultants
      </NavLink>
      <NavLink
        to="/services"
        className="font-bold mx-5 my-2 md:my-0 hover:border"
      >
        Services
      </NavLink>
      {user && isAdmin && (
        <NavLink
          to="/dashboard/adminhome"
          className="font-bold mx-5 my-2 md:my-0 hover:border"
        >
          Dashboard
        </NavLink>
      )}
      {user && isConsultant && (
        <NavLink
          to="/dashboard/consultanthome"
          className="font-bold mx-5 my-2 md:my-0 hover:border"
        >
          Dashboard
        </NavLink>
      )}
      {user && isCustomer && (
        <NavLink
          to="/dashboard/customerhome"
          className="font-bold mx-5 my-2 md:my-0 hover:border"
        >
          Dashboard
        </NavLink>
      )}
    </>
  );
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  return (
    <div className="navbar bg-[#e2136e] text-[#f3f3f3] lg:px-10 dark:text-gray-100 dark:bg-slate-900">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <FaBars className="text-3xl"></FaBars>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-slate-900 rounded-box w-52 text-gray-950 dark:text-white"
          >
            {navItems}
          </ul>
        </div>
        <p className="btn btn-ghost normal-case md:text-2xl">Expert Link</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user && (
          <img src={user?.photoURL} className="w-8 rounded-3xl" alt="" />
        )}
        {user ? (
          <button
            onClick={handleLogOut}
            className="py-1 px-2 mx-1 rounded hover:bg-[#af2963] font-semibold md:my-0 text-white border"
          >
            Log out
          </button>
        ) : (
          <Link to="/login">
            <button className="py-1 px-2 mx-1 rounded hover:bg-[#af2963] font-semibold md:my-0 text-white border">
              Log in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;

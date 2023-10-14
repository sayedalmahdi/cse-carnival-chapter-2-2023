import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../public/logo.png'


const DashboardMenu = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <img src={logo} alt="" />
                    <div className="divider"></div>
                    {/* Sidebar content here */}
                    <li className='hover:bg-primary text-xl font-semibold duration-500 rounded-md'><Link to='/'>Home</Link></li>
                    <li className='hover:bg-primary text-xl font-semibold duration-500 rounded-md'><Link to='/dashboardMenu/profile'>Profile</Link></li>
                    <li className='hover:bg-primary text-xl font-semibold duration-500 rounded-md'><Link to='/dashboardMenu/appointment'>Appointment</Link></li>
                    <li className='hover:bg-primary text-xl font-semibold duration-500 rounded-md'><Link to='/dashboardMenu/payment'>Payment</Link></li>
                    <li className='hover:bg-primary text-xl font-semibold duration-500 rounded-md'><Link to='/dashboardMenu/settings'>Settings</Link></li>
                    <li className='hover:bg-primary text-xl font-semibold duration-500 rounded-md'><Link to='/dashboardMenu/setAppointment'>Set Appointment</Link></li>
                    <li>
                        <details open>
                            <summary className='hover:bg-primary text-xl font-semibold duration-500 rounded-md'>Update Users</summary>
                            <ul>
                                <li className='hover:bg-primary text-xl font-semibold duration-500 rounded-md'><Link to='/dashboardMenu/consultant'>Consultant</Link></li>
                                <li className='hover:bg-primary text-xl font-semibold duration-500 rounded-md'><Link to='/dashboardMenu/consultee'>Consultant</Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default DashboardMenu;
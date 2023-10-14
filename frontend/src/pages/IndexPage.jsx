import React from 'react';
import { Outlet } from 'react-router-dom';

import LoginPageSVG from "../assets/LoginPage.svg";


function IndexPage() {

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="opacity-90 flex flex-col bg-gray-100 sm:w-1/2 CenterContent">
                <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center" >
                    Welcome to <span className="text-pria">ReachOut</span></h1>
                <object
                    type="image/svg+xml"
                    data={LoginPageSVG}
                    className="max-h-[500px] w-auto h-auto"
                />

            </div>
            <div className="sm:w-1/2">
                <Outlet />
            </div>
        </div>
    );
}

export default IndexPage;
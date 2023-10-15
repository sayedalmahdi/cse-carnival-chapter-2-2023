import React from 'react';

const SetAppointment = () => {
    return (
        <div>
            <div className="">
                <input type="text" placeholder="Search Experts" className="input input-bordered w-24 md:w-auto" />
                <input type="date" className='p-2 rounded-lg bg-slate-800' />
            </div>
        </div>
    );
};

export default SetAppointment;
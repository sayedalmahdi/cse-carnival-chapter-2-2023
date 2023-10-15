import React from 'react';

const MakeAdmin = () => {
    return (
        <div className='flex space-x-10 items-end'>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-lg">Enter Email Address</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </div>
    );
};

export default MakeAdmin;
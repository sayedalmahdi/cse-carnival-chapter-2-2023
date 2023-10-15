import React from 'react';
import profileIgm from '../../../assets/profileIgm.jpg'

const Profile = () => {
    return (
        <div className='space-y-8 text-center'>
            <div className="flex flex-col w-full lg:flex-row bg-neutral-focus shadow-lg p-32 rounded-3xl">
                <div className="grid flex-grow h-32 card rounded-box place-items-center">
                    <div className="avatar">
                        <div className="w-24 mask mask-squircle">
                            <img src={profileIgm} />
                        </div>
                    </div>
                </div>
                <div className="divider lg:divider-horizontal"></div>
                <div className="grid flex-grow h-32 card rounded-box place-items-center space-y-4">
                    <input type="text" placeholder="john smith" className="input input-bordered w-full max-w-xs" disabled />
                    <input type="text" placeholder="john@gmail.com" className="input input-bordered w-full max-w-xs" disabled />
                    <input type="text" placeholder="+8801XXXXXXXXXX" className="input input-bordered w-full max-w-xs" disabled />
                </div>
                <div className="divider lg:divider-horizontal"></div>
                <div className="grid flex-grow h-32 card rounded-box place-items-center space-y-4">
                    <input type="text" placeholder="25" className="input input-bordered w-full max-w-xs" disabled />
                    <input type="text" placeholder="add address" className="input input-bordered w-full max-w-xs" disabled />
                </div>
            </div>
            <button className="btn btn-primary">Update</button>
        </div>
    );
};

export default Profile;
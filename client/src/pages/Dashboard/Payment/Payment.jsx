import React from 'react';

const Payment = () => {
    return (
        <div className='flex space-x-10 items-end'>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-lg">Bkash Number</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-lg">Amount</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </div>
            <button className="btn btn-primary">Pay Now</button>
        </div>
    );
};

export default Payment;
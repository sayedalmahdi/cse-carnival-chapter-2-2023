import React from 'react';
import p01 from "../../../assets/professional/1.jpg"
import p02 from "../../../assets/professional/2.jpg"
import p03 from "../../../assets/professional/3.jpg"

const Expert = () => {
    return (
        <>
            <h2 className='text-center text-6xl mt-5 mb-5 p-3'>Meet Our Experts</h2>
            <div className='flex mt-3'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={p01} alt="P1" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">John</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, culpa.</p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={p02} alt="P2" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Mike</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, molestiae?</p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={p03} alt="P3" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Wiliam</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, sed.</p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={p01} alt="P4" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Andrewo</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, sed.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Expert;
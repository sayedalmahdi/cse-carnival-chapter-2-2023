import React from 'react';
import p01 from "../../../assets/test/1.jpg"
import p02 from "../../../assets/test/2.jpg"
import p03 from "../../../assets/test/3.jpg"
import p04 from "../../../assets/test/4.jpg"

const Testomonial = () => {
    return (
        <>
            <h2 className='text-center text-6xl mt-5 mb-5 p-3 '>Testomonial</h2>
            <div className='flex mt-3 justify-center'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={p01} alt="P1" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">John</h2>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" checked />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                        </div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, culpa. Lorem ipsum dolor sit amet. </p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={p02} alt="P2" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Mike</h2>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" checked />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, molestiae? Lorem ipsum dolor sit amet. </p>
                    </div>

                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={p03} alt="P3" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Wiliam</h2>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" checked />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, sed. Lorem ipsum dolor sit amet. </p>
                    </div>

                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={p04} alt="P4" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Andrewo</h2>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" checked />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                            <input type="radio" name="rating-1" className="mask mask-star" />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, sed. Lorem ipsum dolor sit amet.</p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Testomonial;
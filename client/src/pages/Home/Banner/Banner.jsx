import React from 'react';
import './Banner.css'
import bannerRight from '../../../assets/banner_right.png'
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='banner'>
            <div className='lg:w-1/3 p-12 space-y-10 max-w-screen-xl mx-auto text-center'>
                <h1 className='lg:mt-10'>
                    <span className='text-2xl lg:text-6xl font-semibold text-white'>We Are Here To</span><br/>
                    <span className='text-3xl lg:text-7xl font-semibold text-primary'> Guide You Grow</span><br/>
                    <span className='text-2xl lg:text-6xl font-semibold text-white'> With Our Experts</span>
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea natus voluptatibus aperiam, veritatis rem reiciendis pariatur recusandae quisquam quos, quis ut molestiae eos culpa vel dolorum vitae fugiat! Quia, impedit?</p>
                <button className="btn btn-active btn-primary hover:scale-95"><Link to='/signup'>Get Started</Link></button>
            </div>
        </div>
    );
};

export default Banner;
import React from 'react';
import { useRouteError } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div className='not-found'>
        </div>
    );
};

export default NotFound;
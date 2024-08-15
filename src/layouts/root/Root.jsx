import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';


const Root = () => {
    return (
        <div className=''>
            <Navbar/>
            <div >
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;
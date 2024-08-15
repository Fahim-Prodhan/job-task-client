import React, { useContext } from 'react';
import auth from '../../firebase/firebase.config';
import { AuthContext } from '../../provider/AuthProvider';
import Products from '../Products/Products';

const Home = () => {

    const {user} = useContext(AuthContext)
    console.log(user);

    return (

        <div id='home-container' className='scroll-smooth'>
            <div className="max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12">
                <Products></Products>
            </div>
        </div>
    );
};

export default Home;
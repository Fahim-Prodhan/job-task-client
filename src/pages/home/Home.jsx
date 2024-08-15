import React, { useContext } from 'react';
import auth from '../../firebase/firebase.config';
import { AuthContext } from '../../provider/AuthProvider';
import Products from '../Products/Products';

const Home = () => {

    const {user} = useContext(AuthContext)
    console.log(user);

    return (

        <div id='home-container' className='scroll-smooth'>
            <div className="">
                <Products></Products>
            </div>
        </div>
    );
};

export default Home;
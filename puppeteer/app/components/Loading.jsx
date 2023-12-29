import React from 'react';
import loadingAnim from '../assets/loadingAnim.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-sky-600/20 select-none pointer-events-none'>

<Lottie animationData={loadingAnim} loop={true} />


            
        </div>
    );
};

export default Loading;
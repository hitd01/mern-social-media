import React from 'react';
import './homeStyles.scss';

// components
import { ProfileSide, PostSide, RightSide } from '../../components';

const Home = () => {
    return (
        <div className="Home">
            <ProfileSide />
            <PostSide />
            <RightSide />
        </div>
    );
};

export default Home;

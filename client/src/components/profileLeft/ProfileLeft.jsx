import React from 'react';
// components
import FollowersCard from '../profileSide/followersCard/FollowersCard';
import LogoSearch from '../profileSide/logoSearch/LogoSearch';
import InfoCard from './infoCard/InfoCard';

const ProfileLeft = () => {
    return (
        <div className="ProfileLeft">
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    );
};

export default ProfileLeft;

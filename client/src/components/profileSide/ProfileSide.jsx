import React from 'react';
import './profileSideStyles.scss';

// components
import LogoSearch from './logoSearch/LogoSearch';
import ProfileCard from './profileCard/ProfileCard';
import FollowersCard from './followersCard/FollowersCard';

const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch />
            <ProfileCard />
            <FollowersCard />
        </div>
    );
};

export default ProfileSide;

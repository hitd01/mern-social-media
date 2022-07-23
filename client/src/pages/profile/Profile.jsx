import React from 'react';
import './profileStyles.scss';
// components
import { PostSide, ProfileLeft, RightSide } from '../../components';
import ProfileCard from '../../components/profileSide/profileCard/ProfileCard';

const Profile = () => {
    return (
        <div className="Profile">
            <ProfileLeft />
            <div className="profile-center">
                <ProfileCard />
                <PostSide />
            </div>
            <RightSide />
        </div>
    );
};

export default Profile;

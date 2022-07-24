import React, { useEffect } from 'react';
import './profileStyles.scss';
// components
import { PostSide, ProfileLeft, RightSide } from '../../components';
import ProfileCard from '../../components/profileSide/profileCard/ProfileCard';
// react redux hooks
import { useSelector } from 'react-redux';
// react router dom hooks
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const { authData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!localStorage.getItem('profile') || !authData) {
            navigate('../auth', { replace: true });
        }
    }, [authData, navigate]);

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

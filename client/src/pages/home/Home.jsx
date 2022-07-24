import React, { useEffect } from 'react';
import './homeStyles.scss';
// components
import { ProfileSide, PostSide, RightSide } from '../../components';
// react redux hooks
import { useSelector } from 'react-redux';
// react router dom hooks
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const { authData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!localStorage.getItem('profile') || !authData) {
            navigate('../auth', { replace: true });
        }
    }, [authData, navigate]);

    return (
        <div className="Home">
            <ProfileSide />
            <PostSide />
            <RightSide />
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import './profileCardStyles.scss';
// images
import Cover from '../../../img/cover.jpg';
import Profile from '../../../img/profileImg.jpg';
// react router dom hooks
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';

const ProfileCard = () => {
    // location
    const location = useLocation();

    // states
    const [isProfilePage, setIsProfilePage] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (location?.pathname === '/') {
            setIsProfilePage(false);
        }
    }, [location]);

    useEffect(() => {
        if (localStorage.getItem('profile')) {
            setProfile(JSON.parse(localStorage.getItem('profile')));
        }
    }, []);

    return (
        <div className="ProfileCard">
            <div className="profile-img">
                <img src={Cover} alt="" />
                <img src={Profile} alt="" />
            </div>

            <div className="profile-name">
                <span>HIT Panda</span>
                <span>Fullstack Web Developer</span>
            </div>

            <div className="follow-status">
                <hr />
                <div>
                    <div className="follow">
                        <span>6,890</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>1</span>
                        <span>Followers</span>
                    </div>
                </div>
                <hr />
            </div>
            {isProfilePage ? (
                ''
            ) : (
                <Link to={`/profile/${profile?.user?._id}`}>My Profile</Link>
            )}
        </div>
    );
};

export default ProfileCard;

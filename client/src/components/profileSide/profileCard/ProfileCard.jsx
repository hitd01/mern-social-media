import React, { useState } from 'react';
import './profileCardStyles.scss';
// react router dom hooks
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';

const serverPublic =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_PUBLIC_FOLDER
        : process.env.REACT_APP_PRODUCT_PUBLIC_FOLDER;

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
                <img
                    src={
                        profile?.user?.coverPicture
                            ? `${serverPublic}/${profile?.user?.coverPicture}`
                            : `${serverPublic}/default-cover.jpg`
                    }
                    alt=""
                />
                <img
                    src={
                        profile?.user?.coverPicture
                            ? `${serverPublic}/${profile?.user?.profilePicture}`
                            : `${serverPublic}/default-profile.png`
                    }
                    alt=""
                />
            </div>

            <div className="profile-name">
                <span>
                    {profile?.user?.firstname} {profile?.user?.lastname}
                </span>
                <span>
                    {profile?.user?.worksAt
                        ? profile?.user?.worksAt
                        : 'Write about yourself'}
                </span>
            </div>

            <div className="follow-status">
                <hr />
                <div>
                    <div className="follow">
                        <span>{profile?.user?.followers?.length}</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{profile?.user?.following?.length}</span>
                        <span>Followings</span>
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

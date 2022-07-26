import React, { useEffect, useState } from 'react';
import './profileCardStyles.scss';
// react router dom hooks
import { useLocation, Link, useParams } from 'react-router-dom';
// react redux hooks
import { useSelector } from 'react-redux';
// user api
import { getUser } from '../../../api/userApi';

const serverPublic =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_PUBLIC_FOLDER
        : process.env.REACT_APP_PRODUCT_PUBLIC_FOLDER;

const ProfileCard = () => {
    // location
    const location = useLocation();
    const params = useParams();

    // states
    const [isProfilePage, setIsProfilePage] = useState(true);
    const [profile, setProfile] = useState(null);
    // redux states
    const { authData } = useSelector((state) => state.auth);

    // component mount
    useEffect(() => {
        const fetchProfileUser = async () => {
            if (isProfilePage && params.id) {
                if (params.id === authData?.user?._id) {
                    setProfile(authData?.user);
                } else {
                    const { data } = await getUser(params.id);
                    if (data?.success) {
                        setProfile(data?.user);
                    }
                }
            } else {
                setProfile(authData?.user);
            }
        };

        fetchProfileUser();
    }, [authData, params, isProfilePage]);

    useEffect(() => {
        if (location?.pathname === '/') {
            setIsProfilePage(false);
        }
    }, [location]);

    return (
        <div className="ProfileCard">
            <div className="profile-img">
                <img
                    src={
                        profile?.coverPicture
                            ? `${serverPublic}/${profile?.coverPicture}`
                            : `${serverPublic}/default-cover.jpg`
                    }
                    alt=""
                />
                <img
                    src={
                        profile?.profilePicture
                            ? `${serverPublic}/${profile?.profilePicture}`
                            : `${serverPublic}/default-profile.png`
                    }
                    alt=""
                />
            </div>

            <div className="profile-name">
                <span>
                    {profile?.firstname} {profile?.lastname}
                </span>
                <span>
                    {profile?.worksAt
                        ? profile?.worksAt
                        : 'Write about yourself'}
                </span>
            </div>

            <div className="follow-status">
                <hr />
                <div>
                    <div className="follow">
                        <span>{profile?.followers?.length}</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{profile?.following?.length}</span>
                        <span>Followings</span>
                    </div>
                </div>
                <hr />
            </div>
            {isProfilePage ? (
                ''
            ) : (
                <Link to={`/profile/${profile?._id}`}>My Profile</Link>
            )}
        </div>
    );
};

export default ProfileCard;

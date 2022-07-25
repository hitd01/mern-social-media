import React, { useState } from 'react';
// react redux hooks
import { useSelector, useDispatch } from 'react-redux';
// user function
import { followUser, unfollowUser } from '../../pages/auth/authSlice';

const serverPublic =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_PUBLIC_FOLDER
        : process.env.REACT_APP_PRODUCT_PUBLIC_FOLDER;

const User = ({ person }) => {
    const dispatch = useDispatch();
    // redux states
    const { authData } = useSelector((state) => state.auth);

    // states
    const [following, setFollowing] = useState(
        person?.followers?.includes(authData?.user?._id)
    );

    // Handle follow
    const handleFollow = () => {
        const payload = {
            followUserId: person?._id,
            currentUserId: authData?.user?._id,
        };
        following
            ? dispatch(unfollowUser(payload))
            : dispatch(followUser(payload));
        setFollowing(!following);
    };

    return (
        <div className="follower">
            <div>
                <img
                    src={
                        person?.profilePicture
                            ? `${serverPublic}/${person?.profilePicture}`
                            : `${serverPublic}/default-profile.png`
                    }
                    alt=""
                    className="follower-image"
                />
                <div className="name">
                    <span>{person?.firstname}</span>
                    <span>@{person?.username}</span>
                </div>
            </div>
            <button
                className={
                    following
                        ? 'button fc-button unfollow-button'
                        : 'button fc-button'
                }
                onClick={handleFollow}
            >
                {following ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
};

export default User;

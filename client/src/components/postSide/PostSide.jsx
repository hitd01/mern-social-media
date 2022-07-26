import React, { useEffect, useState } from 'react';
import './postSideStyles.scss';
// components
import Posts from './posts/Posts';
import PostShare from './postShare/PostShare';
// react router dom hooks
import { useLocation, useParams } from 'react-router-dom';
// react redux hooks
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../pages/auth/authSlice';

const PostSide = () => {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();

    // states
    const [isHidden, setIsHidden] = useState(false);
    const [following, setFollowing] = useState(false);
    // redux states
    const { authData } = useSelector((state) => state.auth);

    useEffect(() => {
        let isMounted = true;
        if (
            location.pathname !== '/' &&
            params?.id !== authData?.user?._id &&
            isMounted
        ) {
            setIsHidden(true);
            if (authData?.user?.following?.includes(params.id)) {
                setFollowing(true);
            } else {
                setFollowing(false);
            }
        }

        return () => {
            isMounted = false;
        };
    }, [location, params, authData]);

    // Handle follow
    const handleFollow = () => {
        const payload = {
            followUserId: params?.id,
            currentUserId: authData?.user?._id,
        };
        following
            ? dispatch(unfollowUser(payload))
            : dispatch(followUser(payload));
        setFollowing(!following);
    };

    return (
        <div className="PostSide">
            {isHidden ? (
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
            ) : (
                <PostShare />
            )}
            <Posts />
        </div>
    );
};

export default PostSide;

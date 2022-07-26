import React, { useEffect, useState } from 'react';
import './infoCardStyles.scss';
// icon
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from './profileModal/ProfileModal';
// react redux hooks
import { useDispatch, useSelector } from 'react-redux';
// auth reducers
import { logout } from '../../../pages/auth/authSlice';
// react router dom hooks
import { useParams } from 'react-router-dom';
import { getUser } from '../../../api/userApi';

const InfoCard = () => {
    const dispatch = useDispatch();
    const params = useParams();

    // states
    const [modalOpened, setModalOpened] = useState(false);
    const [profileUser, setProfileUser] = useState({});
    // redux states
    const { authData } = useSelector((state) => state.auth);

    // component mount
    useEffect(() => {
        const fetchProfileUser = async () => {
            if (params.id === authData?.user?._id) {
                setProfileUser(authData?.user);
            } else {
                const { data } = await getUser(params.id);
                if (data?.success) {
                    setProfileUser(data?.user);
                }
            }
        };

        fetchProfileUser();
    }, [authData, params]);

    return (
        <div className="InfoCard">
            <div className="info-head">
                <h4>Profile Info</h4>
                {authData?.user?._id === params.id && (
                    <div>
                        <UilPen
                            width="2rem"
                            height="1.2rem"
                            onClick={() => setModalOpened(true)}
                        />
                        <ProfileModal
                            modalOpened={modalOpened}
                            setModalOpened={setModalOpened}
                            user={authData?.user}
                        />
                    </div>
                )}
            </div>

            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>{profileUser?.relationship}</span>
            </div>

            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>{profileUser?.livesIn}</span>
            </div>

            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>{profileUser?.worksAt}</span>
            </div>

            {authData?.user?._id === params.id && (
                <button
                    className="button logout-button"
                    onClick={() => dispatch(logout())}
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default InfoCard;

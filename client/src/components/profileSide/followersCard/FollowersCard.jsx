import React, { useEffect, useState } from 'react';
import './followersCard.scss';
// user requests
import { getAllUsers } from '../../../api/userApi';
// react redux hooks
import { useSelector } from 'react-redux';
// components
import User from '../../user/User';
import FollowersModal from './followersModal/FollowersModal';

const FollowersCard = ({ location }) => {
    // states
    const [modalOpened, setModalOpened] = useState(false);
    const [persons, setPersons] = useState([]);

    // redux states
    const { authData } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUsers();
            if (location) {
                setPersons(data?.users);
            } else {
                setPersons(data?.users?.slice(0, 4));
            }
        };
        fetchPersons();
    }, [location]);

    return (
        <div className="FollowersCard">
            <h3>People you may know</h3>

            {persons.map(
                (person) =>
                    person?._id !== authData?.user?._id && (
                        <User person={person} key={person?._id} />
                    )
            )}

            {!location ? (
                <button
                    className="show-more button"
                    onClick={() => setModalOpened(true)}
                >
                    Show more
                </button>
            ) : (
                ''
            )}

            <FollowersModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
            />
        </div>
    );
};

export default FollowersCard;

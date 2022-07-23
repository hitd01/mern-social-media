import React, { useState } from 'react';
import './infoCardStyles.scss';
// icon
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from './profileModal/ProfileModal';

const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false);
    return (
        <div className="InfoCard">
            <div className="info-head">
                <h4>Your Info</h4>
                <div>
                    <UilPen
                        width="2rem"
                        height="1.2rem"
                        onClick={() => setModalOpened(true)}
                    />
                    <ProfileModal
                        modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                    />
                </div>
            </div>

            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>Single</span>
            </div>

            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>Viet Nam</span>
            </div>

            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>Ha Noi</span>
            </div>

            <button className="button logout-button">Logout</button>
        </div>
    );
};

export default InfoCard;
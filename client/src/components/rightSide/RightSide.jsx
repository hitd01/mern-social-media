import React, { useState } from 'react';
import './rightSideStyles.scss';
// icon
import { UilSetting } from '@iconscout/react-unicons';
// images
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import TrendCard from './trendCard/TrendCard';
import ShareModal from './shareModal/ShareModal';
// react router dom hooks
import { Link } from 'react-router-dom';

const RightSide = () => {
    const [modalOpened, setModalOpened] = useState(false);
    return (
        <div className="RightSide">
            <div className="nav-icons">
                <Link to={`/`}>
                    <img src={Home} alt="" />
                </Link>
                <UilSetting />
                <img src={Noti} alt="" />
                <img src={Comment} alt="" />
            </div>

            <TrendCard />

            <button
                className="button r-button"
                onClick={() => setModalOpened(true)}
            >
                Share
            </button>
            <ShareModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
            />
        </div>
    );
};

export default RightSide;

import React from 'react';
import './profileCardStyles.scss';

// images
import Cover from '../../../img/cover.jpg';
import Profile from '../../../img/profileImg.jpg';

const ProfileCard = () => {
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
            <span>My Profile</span>
        </div>
    );
};

export default ProfileCard;

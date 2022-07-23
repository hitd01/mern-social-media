import React from 'react';
import './followersCard.scss';
// data
import { followersData } from '../../../data/FollowersCardData';

const FollowersCard = () => {
    return (
        <div className="FollowersCard">
            <h3>People you may know</h3>

            {followersData.map((follower) => (
                <div className="follower" key={follower.id}>
                    <div>
                        <img
                            src={follower.img}
                            alt=""
                            className="follower-image"
                        />
                        <div className="name">
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className="button fc-button">Follow</button>
                </div>
            ))}
        </div>
    );
};

export default FollowersCard;

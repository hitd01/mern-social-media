import React from 'react';
import './trendCardStyles.scss';
// data
import { trendData } from '../../../data/TrendData';

const TrendCard = () => {
    return (
        <div className="TrendCard">
            <h3>Trends for you</h3>
            {trendData.map((trend, index) => (
                <div className="trend" key={index}>
                    <span>#{trend.name}</span>
                    <span>{trend.shares}k shares</span>
                </div>
            ))}
        </div>
    );
};

export default TrendCard;

import React from 'react';
import './logoSearchStyles.scss';
// logo img
import Logo from '../../../img/logo.png';
// icons
import { UilSearch } from '@iconscout/react-unicons';

const LogoSearch = () => {
    return (
        <div className="LogoSearch">
            <img src={Logo} alt="" />
            <div className="search">
                <input type="text" placeholder="#Explore" />
                <div className="s-icon">
                    <UilSearch />
                </div>
            </div>
        </div>
    );
};

export default LogoSearch;

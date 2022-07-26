import React from 'react';
import './logoSearchStyles.scss';
// logo img
import Logo from '../../../img/logo.png';
// icons
import { UilSearch } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

const LogoSearch = () => {
    return (
        <div className="LogoSearch">
            <Link to={'/'}>
                <img src={Logo} alt="" />
            </Link>
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

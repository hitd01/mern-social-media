import React from 'react';
import './App.scss';

// pages
import { Home, Profile } from './pages';

const App = () => {
    return (
        <div className="App">
            <div className="blur"></div>
            <div className="blur"></div>
            {/* <Home /> */}
            <Profile />
        </div>
    );
};

export default App;

import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
// pages
import { Home, Profile, Auth } from './pages';
// react redux hooks
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';

const App = () => {
    // redux state
    const { authData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (authData && localStorage.getItem('profile')) {
            setAuthToken(JSON.parse(localStorage.getItem('profile'))?.token);
        } else {
            setAuthToken(null);
        }
    }, [authData]);

    return (
        <div className="App">
            <div className="blur" style={{ top: '-18%', right: '0' }}></div>
            <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: '1rem' }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;

import React from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
// pages
import { Home, Profile, Auth } from './pages';
//
import { useSelector } from 'react-redux';

const App = () => {
    const user = useSelector((state) => state.auth.authData);

    return (
        <div className="App">
            <div className="blur" style={{ top: '-18%', right: '0' }}></div>
            <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
            <Routes>
                <Route
                    path="/"
                    element={
                        user ? <Navigate to="home" /> : <Navigate to="auth" />
                    }
                />
                <Route
                    path="/home"
                    element={user ? <Home /> : <Navigate to="../auth" />}
                />
                <Route
                    path="/auth"
                    element={user ? <Navigate to="../home" /> : <Auth />}
                />
                <Route
                    path="/profile/:id"
                    element={user ? <Profile /> : <Navigate to="../auth" />}
                />
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

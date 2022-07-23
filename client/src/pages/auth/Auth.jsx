import React, { useState } from 'react';
import './authStyles.scss';
// image
import Logo from '../../img/logo.png';
//
import { useDispatch, useSelector } from 'react-redux';
// auth function
import { signup, login } from './authSlice';

const Auth = () => {
    const dispatch = useDispatch();
    // states
    const initialState = {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: '',
    };
    const [isSignUp, setIsSignUp] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(true);
    const [data, setData] = useState(initialState);

    // redux state
    const { authLoading } = useSelector((state) => state.auth);

    // Reset Form
    const resetForm = () => {
        setData(initialState);
        setConfirmPassword(confirmPassword);
    };

    // Handle change in input
    const handleChangeInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmPassword(true);
        if (isSignUp) {
            data.password === data.confirmPassword
                ? dispatch(signup(data))
                : setConfirmPassword(false);
        } else {
            dispatch(login(data));
        }
    };

    return (
        <div className="Auth">
            <div className="auth-left">
                <img src={Logo} alt="" />
                <div className="web-name">
                    <h1>Social Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>
            <div className="auth-right">
                <form className="info-form auth-form" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? 'Register' : 'Login'}</h3>

                    {isSignUp && (
                        <div>
                            <input
                                required
                                type="text"
                                placeholder="First Name"
                                className="info-input"
                                name="firstname"
                                value={data.firstname}
                                onChange={handleChangeInput}
                            />
                            <input
                                required
                                type="text"
                                placeholder="Last Name"
                                className="info-input"
                                name="lastname"
                                value={data.lastname}
                                onChange={handleChangeInput}
                            />
                        </div>
                    )}

                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="info-input"
                            name="username"
                            required
                            value={data.username}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="info-input"
                            placeholder="Password"
                            name="password"
                            required
                            value={data.password}
                            onChange={handleChangeInput}
                        />
                        {isSignUp && (
                            <input
                                required
                                type="password"
                                className="info-input"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleChangeInput}
                            />
                        )}
                    </div>

                    <span
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            alignSelf: 'flex-end',
                            marginRight: '5px',
                            display: confirmPassword ? 'none' : 'block',
                        }}
                    >
                        *Confirm password is not same
                    </span>

                    <div>
                        <span
                            className="suggest-message"
                            onClick={() => {
                                resetForm();
                                setIsSignUp(!isSignUp);
                            }}
                        >
                            {isSignUp
                                ? 'Already have an account Login'
                                : "Don't have an account Sign up"}
                        </span>
                        <button
                            className="button info-button"
                            type="submit"
                            disabled={authLoading === 'pending'}
                        >
                            {authLoading === 'pending'
                                ? 'Loading...'
                                : isSignUp
                                ? 'SignUp'
                                : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;

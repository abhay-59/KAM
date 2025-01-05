// src/pages/Home.js

import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect authenticated users to the dashboard
    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-pink-500 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black px-6">
            <h1 className="text-6xl font-extrabold text-pink-500 mb-6">KAM-Hub</h1>
            <p className="text-lg text-gray-300 text-center max-w-2xl mb-10">
                Welcome to <span className="font-bold text-pink-400">KAM-Hub</span>, a powerful tool for Key Account Managers (KAMs). 
                Use this platform to efficiently access, modify, and manage the details of restaurants, including their leads, status, and activities. 
                Simplify your workflow and stay ahead in managing your accounts.
            </p>
            <div className="flex space-x-6">
                <Link
                    to="/login"
                    className="px-8 py-3 bg-pink-500 text-black text-lg font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-colors duration-300"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-8 py-3 bg-black text-pink-500 text-lg font-semibold rounded-lg border border-pink-500 shadow-lg hover:bg-pink-50 hover:text-black transition-colors duration-300"
                >
                    Sign-up
                </Link>
            </div>
        </div>
    );
};

export default Home;


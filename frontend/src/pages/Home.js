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
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-gray-700 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Key Access Management</h1>
            <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
                The Key Access Management System is a secure and efficient platform designed for managing 
                restaurant details. It allows authorized users to access, view, and modify key information 
                such as menus, locations, operating hours, and promotions. With intuitive features and 
                role-based access control, it ensures data accuracy and smooth operations for restaurants.
            </p>
            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition-colors duration-300"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg border border-gray-800 shadow hover:bg-gray-200 transition-colors duration-300"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Home;

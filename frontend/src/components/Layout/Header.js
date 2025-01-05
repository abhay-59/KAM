import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-gray-800 shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Link
                        to="/dashboard"
                        className="text-white text-3xl font-bold tracking-wide hover:text-gray-300 transition duration-300"
                    >
                        KAM Hub
                    </Link>
                </div>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-white px-4 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg hover:text-gray-300"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/restaurants"
                                className="text-white px-4 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg hover:text-gray-300"
                            >
                                Restaurants
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-700 text-white px-4 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white px-4 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg hover:text-gray-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gray-700 text-white px-4 py-2 rounded-md text-md font-medium transition duration-300 ease-in-out hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;

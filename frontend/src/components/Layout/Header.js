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
        <header className="bg-gradient-to-r from-[#e3307a] to-[#f48fb1] shadow-lg">
            <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4 flex items-center justify-between">
                <div className="flex items-center">
                <Link 
                        to="/dashboard" 
                        className="text-white text-4xl hover:text-gray-200 transition-colors duration-200"
                    >
                        KAM - Hub
                    </Link>
                </div>

                <div className="flex items-center space-x-8">
                    {user ? (
                        <>
                            <Link 
                                to="/dashboard" 
                                className="text-white hover:text-[#f48fb1] px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#e3307a]"
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/restaurants" 
                                className="text-white hover:text-[#f48fb1] px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#e3307a]"
                            >
                                Restaurants
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="bg-[#e3307a] text-white px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#d0266b] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e3307a] focus:ring-offset-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="text-white hover:text-[#f48fb1] px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out hover:bg-[#e3307a]"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-[#e3307a] text-white px-4 py-2 rounded-lg text-lg font-medium hover:bg-[#d0266b] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e3307a] focus:ring-offset-2"
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

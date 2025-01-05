import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, error: contextError } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [localError, setLocalError] = useState('');

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (password !== confirmPassword) {
            setLocalError('Passwords do not match.');
            return;
        }

        const res = await register(name, email, password);

        if (res.success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow">
                <div>
                    <h2 className="text-center text-3xl font-bold text-black">
                        Create Your Account
                    </h2>
                    {/* <p className="mt-2 text-center text-sm text-gray-700">
                        Join us by creating an account below
                    </p> */}
                </div>

                {(localError || contextError) && (
                    <div className="bg-gray-200 border border-gray-400 text-black px-4 py-3 rounded">
                        <span>{localError || contextError}</span>
                    </div>
                )}

                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-black"
                            >
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                                className="mt-1 block w-full px-4 py-2 text-black border border-gray-400 rounded shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-black"
                            >
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="mt-1 block w-full px-4 py-2 text-black border border-gray-400 rounded shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-black"
                            >
                                Password *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                className="mt-1 block w-full px-4 py-2 text-black border border-gray-400 rounded shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Create a password"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-black"
                            >
                                Confirm Password *
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                required
                                className="mt-1 block w-full px-4 py-2 text-black border border-gray-400 rounded shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-6 text-white bg-black hover:bg-gray-800 rounded shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-700">
                        Existing User?{' '}
                        <Link
                            to="/login"
                            className="font-bold text-black hover:text-gray-800"
                        >
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

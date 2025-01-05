// src/components/interactions/InteractionDetail.js

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import { AuthContext } from '../../context/AuthContext';

const InteractionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext); // Ensure AuthContext provides 'token' and 'user'

    const [interaction, setInteraction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInteraction = async () => {
            try {
                console.log("Fetching Interaction Detail for ID:", id);
                console.log("Token:", token);
                const res = await axios.get(`https://kam-4j8a.onrender.com/api/interactions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Interaction Data:", res.data);
                setInteraction(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch Interaction Error:", err);
                setError('Failed to load interaction details.');
                setLoading(false);
            }
        };

        if (token && user) {
            fetchInteraction();
        } else {
            setLoading(false);
            setError('User not authenticated or token missing.');
        }
    }, [id, token, user]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this interaction?')) {
            try {
                await axios.delete(`https://kam-4j8a.onrender.com/api/interactions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                navigate(-1);
            } catch (err) {
                console.error("Delete Interaction Error:", err);
                alert('Failed to delete interaction.');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-xl font-semibold">
                    Loading Interaction...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="bg-gray-800 text-red-500 p-6 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    if (!interaction) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-xl">
                    No interaction found.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-gray-900 shadow-md rounded-lg overflow-hidden">
                    {/* Interaction Header */}
                    <div className="bg-black px-6 py-4">
                        <h2 className="text-2xl font-bold">{interaction.type}</h2>
                    </div>

                    {/* Interaction Details */}
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-400">Details</p>
                                <p className="text-lg">{interaction.details || 'No details provided.'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-400">Date</p>
                                <p className="text-lg">
                                    {interaction.date 
                                        ? moment(interaction.date)
                                            .tz(user?.timezone || 'UTC') // Fallback to 'UTC' if timezone is undefined
                                            .format('YYYY-MM-DD HH:mm')
                                        : 'Date not available'}
                                </p>
                            </div>
                            {/* Display Contact Name */}
                            <div className="space-y-2">
                                <p className="text-sm text-gray-400">Contact</p>
                                <p className="text-lg">
                                    {interaction.contactId 
                                        ? `${interaction.contactId.name} (${interaction.contactId.role})` 
                                        : 'Unknown Contact'}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 pt-6 border-t border-gray-700">
                            <Link
                                to={`/interactions/edit/${interaction._id}`}
                                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out text-center"
                            >
                                Edit Interaction
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-white text-black px-4 py-2 rounded-md text-sm font-medium border border-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out"
                            >
                                Delete Interaction
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-white text-sm font-medium flex items-center"
                    >
                        <span>← Back to Interactions</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InteractionDetail;

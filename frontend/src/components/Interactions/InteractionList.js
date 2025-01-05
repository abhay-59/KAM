import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';

const InteractionList = ({ restaurantId }) => {
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token, user, loading: authLoading } = useContext(AuthContext);

    useEffect(() => {
        const fetchInteractions = async () => {
            try {
                if (!token) {
                    throw new Error("No token found");
                }
                const res = await axios.get(`https://kam-4j8a.onrender.com/api/interactions/restaurant/${restaurantId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInteractions(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load interactions.');
                setLoading(false);
            }
        };

        if (!authLoading && user) {
            fetchInteractions();
        } else {
            setLoading(false);
            setError('User not authenticated.');
        }
    }, [restaurantId, token, user, authLoading]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-gray-800 text-lg font-semibold">
                    Loading Interactions...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-black px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Restaurant Interactions</h2>
            </div>

            <div className="p-6">
                {interactions.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No interactions found.</p>
                        <Link 
                            to={`/restaurants/${restaurantId}/interactions/new`}
                            className="mt-4 inline-block text-gray-800 hover:text-gray-600"
                        >
                            + Add your first interaction
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {interactions.map(interaction => (
                            <div 
                                key={interaction._id}
                                className="flex items-center justify-between p-4 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-150"
                            >
                                <div className="flex-1">
                                    <Link 
                                        to={`/interactions/${interaction._id}`}
                                        className="text-lg font-medium text-gray-900 hover:text-black"
                                    >
                                        {interaction.type}
                                    </Link>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {interaction.details}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-1">
                                        {moment(interaction.date).format('YYYY-MM-DD HH:mm')}
                                    </p>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Contact: {interaction.contactId ? `${interaction.contactId.name} (${interaction.contactId.role})` : 'Unknown Contact'}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Link
                                        to={`/interactions/${interaction._id}`}
                                        className="text-sm text-gray-800 hover:text-gray-600 font-medium"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InteractionList;

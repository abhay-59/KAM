import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import ContactList from '../Contacts/ContactList';
import InteractionList from '../Interactions/InteractionList';

const RestaurantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await axios.get(`https://kam-4j8a.onrender.com/api/restaurants/${id}`);
                setRestaurant(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load restaurant details.');
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this restaurant?')) {
            try {
                const res = await axios.delete(`https://kam-4j8a.onrender.com/api/restaurants/${id}`);
                console.log(res);
                navigate('/restaurants');
            } catch (err) {
                console.error(err);
                alert('Failed to delete restaurant.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="text-xl font-semibold text-white animate-pulse">
                    Loading Restaurant...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="text-xl font-semibold text-white">{error}</div>
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="text-xl font-semibold text-white">No restaurant found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-300">
                    <h2 className="text-3xl font-bold text-black mb-4">{restaurant.name}</h2>

                    <div className="space-y-3 text-lg text-gray-800 mb-6">
                        <p><span className="font-semibold">Address:</span> {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zipcode}</p>
                        <p><span className="font-semibold">Status:</span> {restaurant.status}</p>
                    </div>

                    <div className="flex space-x-4 mb-8">
                        <Link 
                            to={`/restaurants/edit/${restaurant._id}`}
                            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
                        >
                            Edit
                        </Link>
                        <button 
                            onClick={handleDelete}
                            className="bg-white text-black px-6 py-2 rounded-md font-medium border-2 border-black hover:bg-gray-100 transition-colors duration-200"
                        >
                            Delete
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold text-black">Contacts</h3>
                                <Link 
                                    to={`/restaurants/${restaurant._id}/contacts/new`}
                                    className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
                                >
                                    Add Contact
                                </Link>
                            </div>
                            <ContactList restaurantId={restaurant._id} />
                        </section>

                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold text-black">Interactions</h3>
                                <Link 
                                    to={`/restaurants/${restaurant._id}/interactions/new`}
                                    className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
                                >
                                    Add Interaction
                                </Link>
                            </div>
                            <InteractionList restaurantId={restaurant._id} />
                        </section>
                    </div>

                    <p className="text-gray-700 text-sm mt-6">
                        <span className="font-semibold">Last Updated:</span> {moment(restaurant.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;

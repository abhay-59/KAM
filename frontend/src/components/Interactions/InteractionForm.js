// src/components/interactions/InteractionForm.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { AuthContext } from '../../context/AuthContext';

const InteractionForm = () => {
    const { id, restaurantId: paramRestaurantId } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const { user, token, loading: authLoading, error: authError } = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [loadingContacts, setLoadingContacts] = useState(true);
    const [contactsError, setContactsError] = useState('');
    const [formData, setFormData] = useState({
        type: 'Call',
        contactId: '',
        details: '',
        date: '',
    });
    const [error, setError] = useState('');
    const [currentRestaurantId, setCurrentRestaurantId] = useState(paramRestaurantId || '');
    const userTimezone = user.timezone || 'UTC';

    useEffect(() => {
        const fetchInteraction = async () => {
            try {
                if (!user || !userTimezone) {
                    throw new Error('User timezone is not available.');
                }

                const res = await axios.get(`https://kam-4j8a.onrender.com/api/interactions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const interactionData = res.data;
                if (!interactionData.date) {
                    throw new Error('Interaction date is missing.');
                }

                const localDate = moment(interactionData.date)
                    .tz(user.timezone || 'UTC')
                    .format('YYYY-MM-DDTHH:mm');

                setFormData({
                    type: interactionData.type || 'Call',
                    contactId: interactionData.contactId ? interactionData.contactId._id : '',
                    details: interactionData.details || '',
                    date: localDate,
                });
                setCurrentRestaurantId(interactionData.restaurantId);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to load interaction data.');
            }
        };

        if (isEdit && !authLoading && user) {
            fetchInteraction();
        }
    }, [id, isEdit, user, token, authLoading]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                if (!currentRestaurantId) {
                    throw new Error('Restaurant ID is missing.');
                }

                const res = await axios.get(`https://kam-4j8a.onrender.com/api/contacts/restaurant/${currentRestaurantId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setContacts(res.data);
                setLoadingContacts(false);
            } catch (err) {
                setContactsError(err.response?.data?.message || 'Failed to load contacts.');
                setLoadingContacts(false);
            }
        };

        if (currentRestaurantId && token) {
            fetchContacts();
        }
    }, [currentRestaurantId, token]);

    const { type, contactId, details, date } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            if (!user || !userTimezone) {
                throw new Error('User timezone is not available.');
            }

            const utcDate = moment.tz(date, userTimezone || 'UTC').utc().toDate();

            if (isEdit) {
                await axios.put(
                    `https://kam-4j8a.onrender.com/api/interactions/${id}`,
                    { ...formData, date: utcDate },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                navigate(-1);
            } else {
                if (!currentRestaurantId) {
                    throw new Error('Restaurant ID is missing.');
                }
                await axios.post(
                    'https://kam-4j8a.onrender.com/api/interactions',
                    { ...formData, date: utcDate, restaurantId: currentRestaurantId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                navigate(-1);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to save interaction.');
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-gray-600 text-xl font-semibold">
                    Loading...
                </div>
            </div>
        );
    }

    if (authError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-gray-200 border border-gray-300 text-gray-600 px-6 py-4 rounded-lg">
                    {authError}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-black px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">
                            {isEdit ? 'Edit' : 'Add New'} Interaction
                        </h2>
                    </div>

                    {error && (
                        <div className="bg-gray-200 border-l-4 border-red-600 p-4 mx-6 mt-4">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="type"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Type
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={type}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    required
                                >
                                    <option value="Call">Call</option>
                                    <option value="Email">Email</option>
                                    <option value="Order">Order</option>
                                </select>
                            </div>

                            {!isEdit && (
                                <div>
                                    <label
                                        htmlFor="contactId"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Contact
                                    </label>
                                    {loadingContacts ? (
                                        <p className="text-gray-500 text-sm">Loading contacts...</p>
                                    ) : contactsError ? (
                                        <p className="text-red-600 text-sm">{contactsError}</p>
                                    ) : (
                                        <select
                                            id="contactId"
                                            name="contactId"
                                            value={contactId}
                                            onChange={onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            required
                                        >
                                            <option value="">-- Select Contact --</option>
                                            {contacts.map(contact => (
                                                <option key={contact._id} value={contact._id}>
                                                    {contact.name} ({contact.role})
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            )}

                            <div>
                                <label
                                    htmlFor="details"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Details
                                </label>
                                <textarea
                                    id="details"
                                    name="details"
                                    value={details}
                                    onChange={onChange}
                                    rows="4"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                    placeholder="Enter interaction details..."
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    id="date"
                                    name="date"
                                    value={date}
                                    onChange={onChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-black py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                {isEdit ? 'Update' : 'Create'} Interaction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InteractionForm;

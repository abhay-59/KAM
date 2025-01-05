import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ContactList = ({ restaurantId }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get(`https://kam-4j8a.onrender.com/api/contacts/restaurant/${restaurantId}`);
                setContacts(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load contacts.');
                setLoading(false);
            }
        };

        fetchContacts();
    }, [restaurantId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8 bg-black text-white">
                <div className="text-lg font-semibold">
                    Loading Contacts...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-800 text-red-500 px-4 py-3 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-black text-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-900 px-6 py-4">
                <h2 className="text-xl font-semibold">Restaurant Contacts</h2>
            </div>

            <div className="p-6 space-y-4">
                {contacts.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No contacts found.</p>
                        <Link 
                            to={`/restaurants/${restaurantId}/contacts/new`}
                            className="mt-4 inline-block text-gray-400 hover:text-white"
                        >
                            + Add your first contact
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {contacts.map(contact => (
                            <div 
                                key={contact._id}
                                className="flex items-center justify-between p-4 hover:bg-gray-800 rounded-lg border border-gray-700 transition-colors duration-150"
                            >
                                <div className="flex-1">
                                    <Link 
                                        to={`/contacts/${contact._id}`}
                                        className="text-lg font-medium text-white hover:text-gray-400"
                                    >
                                        {contact.name}
                                    </Link>
                                    <p className="text-gray-400 text-sm mt-1">{contact.role}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Link
                                        to={`/contacts/${contact._id}`}
                                        className="text-sm text-gray-400 hover:text-white font-medium"
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

export default ContactList;

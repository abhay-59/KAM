import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ContactForm = () => {
    const { id, restaurantId } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        phone: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            const fetchContact = async () => {
                try {
                    const res = await axios.get(`https://kam-4j8a.onrender.com/api/contacts/${id}`);
                    setFormData({
                        name: res.data.name,
                        role: res.data.role || '',
                        email: res.data.email || '',
                        phone: res.data.phone || '',
                    });
                } catch (err) {
                    console.error(err);
                    setError('Failed to load contact data.');
                }
            };
            fetchContact();
        }
    }, [id, isEdit]);

    const { name, role, email, phone } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`https://kam-4j8a.onrender.com/api/contacts/${id}`, formData);
                navigate(-1);
            } else {
                await axios.post('https://kam-4j8a.onrender.com/api/contacts', { ...formData, restaurantId });
                navigate(-1);
            }
        } catch (err) {
            console.error(err);
            setError(err.response.data.message || 'Failed to save contact.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gray-700 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">
                            {isEdit ? 'Edit' : 'Add New'} Contact
                        </h2>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-gray-700 border-l-4 border-red-500 p-4 mx-6 mt-4">
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={onSubmit} className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label 
                                    htmlFor="name" 
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label 
                                    htmlFor="role" 
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Role
                                </label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label 
                                    htmlFor="email" 
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label 
                                    htmlFor="phone" 
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={onChange}
                                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="bg-gray-700 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-gray-700 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                {isEdit ? 'Update' : 'Create'} Contact
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;

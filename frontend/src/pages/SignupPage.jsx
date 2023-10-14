import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AlreadyHaveAnAccountButton() {
    return (
        <div className="text-center mt-4">
            <Link
                to="/login"
                className="text-lg text-primary hover:text-primaryHover"
            >
                Already have an account?
            </Link>
        </div>
    );
}

function SignupPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('Seller');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle form submission (e.g., perform registration)
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Phone Number:', phoneNumber);
        console.log('Role:', role);

        // You can add your registration logic here
    };

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Signup to <span className="text-secondary">AmraLate</span></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-600">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your first name"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-600">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your last name"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-600">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your phone number"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-600">Role</label>
                        <select
                            id="role"
                            name="role"
                            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="Seller">Seller</option>
                            <option value="Buyer">Buyer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-primary w-full  text-white rounded-lg py-2 px-4 hover:bg-primaryHover transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <AlreadyHaveAnAccountButton />
            </div>
        </div>
    );
}

export default SignupPage;

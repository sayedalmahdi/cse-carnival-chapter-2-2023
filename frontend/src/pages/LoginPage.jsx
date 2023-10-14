import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function ForgottenPasswordButton() {
  return (
    <div className="text-center mt-4">
      <Link
        to="/forgot-password"
        className="text-lg text-blue-500 hover:text-primaryHover"
      >
        Forgot Password?
      </Link>
    </div>
  );
}
function CreateNewAccountButton() {
  return (
    <div className="border-t border-gray-300 mt-6 pt-6 text-center">
      <Link
        to="/signup"
        className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
      >
        Create New Account
      </Link>
    </div>
  )
}


function OAuthButtons() {
  return (
    <div className="text-center">
      <div className="my-3">
        <h2>OR</h2>
      </div>
      <button
        type="button"
        className="w-full py-2 px-4 border-2 font-semibold text-white rounded bg-green-500 hover:bg-green-600 transition duration-300"
      >
        <FontAwesomeIcon icon={faGoogle}
          style={{ color: 'white' }} // Apply a custom color
        /> Continue with Google
      </button>
    </div>
  )
}



function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission (e.g., perform OTP verification)
    console.log('Phone Number:', phoneNumber);
    console.log('OTP:', otp);

    // You can add your verification logic here
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login to <span className="text-secondary">ReachOut</span></h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="otp" className="block text-gray-600">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-primary w-full  text-white rounded-lg py-2 px-4 hover:bg-primaryHover transition duration-300"
          >
            Log In
          </button>
        </form>
        <ForgottenPasswordButton />
        {!window.location.href.endsWith('/login') &&
          <>
            <CreateNewAccountButton />
            <OAuthButtons />
          </>}

      </div>
    </div>
  );
}

export default LoginPage;

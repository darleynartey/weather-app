import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://your-backend-api.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        setMessage('Signup successful!');
        setFormData({ email: '', password: '', confirmPassword: '' });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Signup failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h1>
          <p className="text-sm text-gray-600 text-center mb-4">
            Fill in this form to create an account
          </p>
          <hr className="mb-6" />

          {message && (
            <div className="mb-4 text-center text-sm text-red-500">{message}</div>
          )}

          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
            className="w-full mt-1 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
            className="w-full mt-1 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Repeat Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat Password"
            required
            className="w-full mt-1 mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <label htmlFor="remember" className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              name="remember"
              className="mr-2"
            />
            Remember me
          </label>

          <p className="text-xs text-gray-600 mt-4">
            By creating an account you agree to our{' '}
            <a href="/" className="text-blue-500 hover:underline">
              Terms & Privacy
            </a>
            .
          </p>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            className="font-semibold text-gray-700 bg-gray-200 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300 shadow-md py-2 px-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="font-semibold text-white bg-blue-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-800 shadow-md py-2 px-4"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

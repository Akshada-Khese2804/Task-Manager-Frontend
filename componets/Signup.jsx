import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setLoading(true); 

        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
            setError('Please enter both username and password.');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/signup', {
                username: trimmedUsername,
                password: trimmedPassword,
            });

            alert('User created successfully');
            setUsername('');
            setPassword('');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Error creating user');
            } else {
                setError('Error creating user. Please try again.');
            }
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>} 
        </div>
    );
};

export default Signup;

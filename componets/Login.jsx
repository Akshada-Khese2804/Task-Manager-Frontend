import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Both username and password are required');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login', 
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json', 
                    }
                }
            );

            const token = response.data.token;
            localStorage.setItem('token', token);  
            setToken(token); 

            alert('Login successful');
            
            navigate('/tasks');
        } catch (error) {
            console.error(error);

            if (error.response) {
                if (error.response.status === 400) {
                    alert('Invalid username or password');
                } else {
                    alert(`Error: ${error.response.data.message || 'An error occurred. Please try again.'}`);
                }
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

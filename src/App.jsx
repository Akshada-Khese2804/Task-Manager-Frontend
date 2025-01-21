import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TaskList from './components/TaskList';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    return (
        <Router>
            <div>
                <h1>Task Manager</h1>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
                </nav>

                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />

                    <Route
                        path="/tasks"
                        element={token ? <TaskList token={token} /> : <Navigate to="/login" />}
                    />

                    <Route
                        path="/"
                        element={
                            <div>
                                <h2>Welcome to the Task Manager</h2>
                                <p>
                                    Please <Link to="/login">login</Link> or <Link to="/signup">sign up</Link>.
                                </p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

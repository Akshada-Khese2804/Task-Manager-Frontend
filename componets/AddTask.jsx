import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ fetchTasks, token }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', 
                { title, description },
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGU4MzI5ZGE2Y2VhYmZkMWM4ZTFiOSIsImlhdCI6MTczNzM5Mjk1MCwiZXhwIjoxNzM3Mzk2NTUwfQ.4iLR0-2YJfvZHT_HaB_nLuHWucHmVX6mNA3NNkMltvM` // Pass token in the Authorization header
                    }
                }
            );
            console.log('Task created:', response.data);
            fetchTasks(); 
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;

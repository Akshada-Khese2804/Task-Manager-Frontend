
import React, { useState } from 'react';

const EditTask = ({ task, onUpdate, onCancel }) => {
    const [title, setTitle] = useState(task.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...task, title });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <button type="submit">Update Task</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditTask;
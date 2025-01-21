import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGU4MzI5ZGE2Y2VhYmZkMWM4ZTFiOSIsImlhdCI6MTczNzM5Mjk1MCwiZXhwIjoxNzM3Mzk2NTUwfQ.4iLR0-2YJfvZHT_HaB_nLuHWucHmVX6mNA3NNkMltvM`  // Make sure token is being passed here
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized, please login");
        }
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
    </div>
  );
};

export default TaskList;

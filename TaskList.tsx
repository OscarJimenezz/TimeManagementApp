import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
    id: number;
    title: string;
    description?: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
                setTasks(response.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            {isLoading ? (
                <p>Loading tasks...</p>
            ) : error ? (
                <p>Error fetching tasks: {error}</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
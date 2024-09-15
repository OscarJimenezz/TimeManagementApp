import fetch from 'node-fetch';

const API_BASE_URL = process.env.API_BASE_URL;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

let taskCache: Task[] | null = null; // Cache for tasks

interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

export const authenticate = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export const createTask = async (task: Task) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    taskCache = null; // Invalidate cache after creating a new task
    return data;
  } catch (error) {
    console.error('Create task error:', error);
    throw error;
  }
};

export const getTasks = async () => {
  if (taskCache) { // Return cached tasks if available
    return taskCache;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    taskCache = data; // Cache fetched tasks
    return data;
  } catch (error) {
    console.error('Get tasks error:', error);
    throw error;
  }
};

export const updateTask = async (taskId: number, task: Task) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    taskCache = null; // Invalidate cache after an update
    return data;
  } catch (error) {
    console.error('Update task error:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error deleting task');
    }
    taskCache = null; // Invalidate cache after deletion
    return 'Task deleted successfully';
  } catch (error) {
    console.error('Delete task error:', error);
    throw error;
  }
};
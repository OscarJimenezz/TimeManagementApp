import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

interface Task {
  date: string;
  completedTasks: number;
}

const fetchData = (): Promise<Task[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { date: '2023-01-01', completedTasks: 5 },
        { date: '2023-01-02', completedTasks: 3 },
        { date: '2023-01-03', completedTasks: 8 },
      ]);
    }, 1000);
  });
};

const UserProgressChart: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchData().then(data => {
      setTasks(data);
    });
  }, []);

  const data = {
    labels: tasks.map(task => task.date),
    datasets: [
      {
        label: 'Completed Tasks',
        data: tasks.map(task => task.completedTasks),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={data} options={options} />;
};

export default UserProgressChart;
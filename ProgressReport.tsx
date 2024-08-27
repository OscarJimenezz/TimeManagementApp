import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

interface Task {
  date: string;
  completedTasksCount: number;
}

const fetchTaskData = (): Promise<Task[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { date: '2023-01-01', completedTasksCount: 5 },
        { date: '2023-01-02', completedTasksCount: 3 },
        { date: '2023-01-03', completedTasksCount: 8 },
      ]);
    }, 1000);
  });
};

const TaskCompletionChart: React.FC = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);

  useEffect(() => {
    fetchTaskData().then(data => {
      setTaskData(data);
    });
  }, []);

  const chartData = {
    labels: taskData.map(task => task.date),
    datasets: [
      {
        label: 'Completed Tasks',
        data: taskData.map(task => task.completedTasksCount),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
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

  return <Bar data={chartData} options={chartOptions} />;
};

export default TaskCompletionChart;
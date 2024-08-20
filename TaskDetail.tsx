import * as React from "react";

interface TaskProps {
  description: string;
  deadline: string;
  markCompleted: () => void;
  completed: boolean;
}

const TaskDetails: React.FC<TaskProps> = ({
  description,
  deadline,
  markCompleted,
  completed,
}) => {
  let formattedDeadline: string;
  try {
    formattedDeadline = new Date(deadline).toLocaleDateString();
  } catch (error) {
    console.error("Failed to format deadline:", error);
    // Set a default or error message as the formatted deadline
    formattedDeadline = "Invalid deadline";
  }

  return (
    <div>
      <h2>Description</h2>
      <p>{description}</p>

      <h2>Deadline</h2>
      {/* Show formattedDeadline, which might be an error message if parsing failed */}
      <p>{formattedDeadline}</p>

      <h2>Status</h2>
      {completed ? (
        <p>This task is completed.</p>
      ) : (
        <div>
          <p>This task is not completed.</p>
          <button onClick={markCompleted}>Mark as completed</button>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
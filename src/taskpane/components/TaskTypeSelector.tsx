import * as React from "react";
import { useState } from "react";

const TaskTypeSelector = ({ onSelectTask }) => {
  const [taskType, setTaskType] = useState("");

  const handleSelection = (event) => {
    const selectedTask = event.target.value;
    setTaskType(selectedTask);
    onSelectTask(selectedTask); // Pass the selection to the parent component for further processing
  };

  return (
    <div>
      <label htmlFor="taskType">Select Task Type: </label>
      <select id="taskType" value={taskType} onChange={handleSelection}>
        <option value="">--Choose a task--</option>
        <option value="essay">Essay</option>
        <option value="report">Report</option>
        <option value="creative">Creative Writing</option>
      </select>
    </div>
  );
};

export default TaskTypeSelector;

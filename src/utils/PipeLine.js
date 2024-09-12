import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddTaskModal from "./Modal"; // Assuming AddTaskModal is in the same directory

const PipeLine = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveTask = (newTask) => {
    setTasks([...tasks, newTask]);
    handleCloseModal();
  };

  return (
    <div>
      <h2>PipeLine Component</h2>
      <p>This is the content of the PipeLine component.</p>
      <Button variant="primary" onClick={handleShowModal}>
        Add New Task
      </Button>
      <AddTaskModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveTask}
      />
      <div>
        <h3>Tasks</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.taskname}</strong>: {task.task1}, {task.task2}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PipeLine;

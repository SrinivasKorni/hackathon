import React, { useState } from "react";
import { Button, ModalBody, Modal } from "react-bootstrap";
import "../styles/Button.css";
import VForm from "../styles/Form";

const PipeLine = () => {
  const [showExistingJobs, setShowExistingJobs] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const mystyle = {
    margin: "2%",
  };

  const [tasks, setTasks] = useState([
    {
      taskname: "Sk",
      clusterid: "1234",
      key: "asjd",
      value: "adsds",
    },
  ]);

  const handleShowExistingJobs = () => setShowExistingJobs(true);
  const handleCloseExistingJobs = () => setShowExistingJobs(false);

  const handleShowCreateTask = () => setShowCreateTask(true);
  const handleCloseCreateTask = () => setShowCreateTask(false);

  const handleNewTask = (newTask) => {
    setTasks([...tasks, newTask]); // Add new task to tasks array
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks); // Update tasks array without the deleted task
  };

  return (
    <div>
      {/* Button and Modal for Showing Existing Jobs */}
      <Button
        style={mystyle}
        variant="primary"
        onClick={handleShowExistingJobs}
      >
        Show Existing Jobs
      </Button>
      <br />
      <br />
      <Modal show={showExistingJobs} onHide={handleCloseExistingJobs}>
        <Modal.Header closeButton>
          <Modal.Title>Existing Tasks</Modal.Title>
        </Modal.Header>
        <ModalBody>
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task, index) => (
              <div key={index}>
                <p>
                  <strong>Task Name:</strong> {task.taskname}
                </p>
                <p>
                  <strong>Cluster ID:</strong> {task.clusterid}
                </p>
                <p>
                  <strong>Key:</strong> {task.key}
                </p>
                <p>
                  <strong>Value:</strong> {task.value}
                </p>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </Button>
                <hr />
              </div>
            ))
          )}
        </ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExistingJobs}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Button and Modal for Creating New Task */}
      <Button  variant="primary" onClick={handleShowCreateTask}>
        Create Task
      </Button>
      <Modal show={showCreateTask} onHide={handleCloseCreateTask}>
        <Modal.Header closeButton>
          <Modal.Title>Creating New Task</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <VForm onNewTask={handleNewTask} />
        </ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateTask}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PipeLine;

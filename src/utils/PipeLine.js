import React, { useState, useEffect } from "react";
import { Button, ModalBody, Modal } from "react-bootstrap";
import "../styles/Button.css";
import VForm from "../styles/Form";
import axios from "axios";

const PipeLine = () => {
  const [showExistingJobs, setShowExistingJobs] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const mystyle = {
    margin: "2%",
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/jobs/list"
        );
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setTasks(response.data.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

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
          {error && <p className="error">{error}</p>}
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task, index) => (
              <div key={index}>
                <p>
                  <strong>Job ID:</strong> {task.job_id}
                </p>
                <p>
                  <strong>Creator User Name:</strong> {task.creator_user_name}
                </p>
                {/* <p>
                  <strong>Run As User Name:</strong> {task.run_as_user_name}
                </p> */}
                <p>
                  <strong>Created Time:</strong>{" "}
                  {new Date(task.created_time).toLocaleString()}
                </p>
                {/* <p>
                  <strong>Name:</strong> {task.settings.Title}
                </p> */}
                <p>
                  <strong>Format:</strong> {task.settings.format}
                </p>
                <p>
                  <strong>Max Concurrent Runs:</strong>{" "}
                  {task.settings.max_concurrent_runs}
                </p>
                {/* <p>
                  <strong>Timeout Seconds:</strong>{" "}
                  {task.settings.timeout_seconds} */}
                {/* </p> */}
                {task.settings.notebook_task && (
                  <p>
                    <strong>Notebook Path:</strong>{" "}
                    {task.settings.notebook_task.notebook_path}
                  </p>
                )}
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
      <Button variant="primary" onClick={handleShowCreateTask}>
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

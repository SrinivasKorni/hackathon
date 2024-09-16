import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Form.css"; // Import custom CSS for additional styling

const VForm = () => {
  const [jobName, setJobName] = useState("");
  const [taskNames, setTaskNames] = useState([""]);
  const [paths, setPaths] = useState([""]);
  const [dependents, setDependents] = useState([""]);
  const [clusterIds, setClusterIds] = useState([""]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [allClusters, setAllClusters] = useState([]);
  const [submittedData, setSubmittedData] = useState([]); // Store the list of lists (all form values)

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await axios.get(
          "http://13.233.145.139/api/v1/clusters/list"
        );
        if (response.status === 200 && Array.isArray(response.data.data)) {
          const clusters = response.data.data.map(
            (cluster) => cluster.cluster_id
          );
          setAllClusters(clusters);
        } else {
          setError("Failed to fetch clusters. Please try again.");
          setShow(true);
        }
      } catch (error) {
        setError("Failed to fetch clusters. Please try again.");
        setShow(true);
      }
    };

    fetchClusters();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://13.233.145.139/api/v1/workspace/list"
        );
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setAllTasks(response.data.data);
        } else {
          setError("Failed to fetch tasks. Please try again.");
          setShow(true);
        }
      } catch (error) {
        setError("Failed to fetch tasks. Please try again.");
        setShow(true);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect current form values into a list
    const formData = [
      jobName,
      [...taskNames],
      [...paths],
      [...dependents],
      [...clusterIds],
    ];

    // Add the collected form values to the list of submitted data
    setSubmittedData([...submittedData, formData]);

    console.log("Submitted data:", formData); // Log current submission
    console.log("All submitted data:", submittedData); // Log entire submission history

    // Optionally: Clear form fields after submission
    setJobName("");
    setTaskNames([""]);
    setPaths([""]);
    setDependents([""]);
    setClusterIds([""]);
    setError("");
  };

  const handleAddField = (setter, values) => {
    setter([...values, ""]);
  };

  const handleFieldChange = (setter, values, index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setter(newValues);
  };

  const handleClose = () => setShow(false);

  const extractFileName = (path) => {
    return path.split("/").pop();
  };

  return (
    <Container className="vform-container">
      <Form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <Form.Group controlId="jobName">
          <Form.Label>Job Name</Form.Label>
          <Form.Control
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            required
            disabled={submittedData.length > 0} // Disable input after the first job is submitted
          />
        </Form.Group>

        <Form.Group controlId="paths">
          <Form.Label>Task Name</Form.Label>
          {paths.map((path, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <Form.Control
                  type="text"
                  value={path}
                  onChange={(e) =>
                    handleFieldChange(setPaths, paths, index, e.target.value)
                  }
                  required
                />
              </Col>
            </Row>
          ))}
          {/* <Button
            variant="outline-primary"
            onClick={() => handleAddField(setPaths, paths)}
          >
            Add Path
          </Button> */}
        </Form.Group>
        <Form.Group controlId="taskNames">
          <Form.Label>Task Path</Form.Label>
          {taskNames.map((taskName, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <Form.Control
                  as="select"
                  value={taskName}
                  placeholder="Select Task"
                  onChange={(e) =>
                    handleFieldChange(
                      setTaskNames,
                      taskNames,
                      index,
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">Select Task</option>
                  {allTasks.map((task, idx) => (
                    <option key={idx} value={task}>
                      {extractFileName(task)}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          ))}
          {/* <Button
            variant="outline-primary"
            onClick={() => handleAddField(setTaskNames, taskNames)}
          >
            Add Task Name
          </Button> */}
        </Form.Group>
        <Form.Group controlId="dependents">
          <Form.Label>Dependents</Form.Label>
          {dependents.map((dependent, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <Form.Control
                  as="select"
                  placeholder="Select Dependent"
                  value={dependent}
                  onChange={(e) =>
                    handleFieldChange(
                      setDependents,
                      dependents,
                      index,
                      e.target.value
                    )
                  }
                >
                  <option value="">Select Dependent</option>
                  {submittedData.flatMap((jobData, jobIdx) =>
                    // jobData[1] is the taskNames array for each job
                    jobData[1].map((taskName, taskIdx) => (
                      <option key={`${jobIdx}-${taskIdx}`} value={taskName}>
                        {extractFileName(taskName)} (from Job {jobIdx + 1})
                      </option>
                    ))
                  )}
                </Form.Control>
              </Col>
            </Row>
          ))}
          <Button
            variant="outline-primary"
            onClick={() => handleAddField(setDependents, dependents)}
          >
            Add Dependent
          </Button>
        </Form.Group>
        <Form.Group controlId="clusterIds">
          <Form.Label>Cluster IDs</Form.Label>
          {clusterIds.map((clusterId, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <Form.Control
                  as="select"
                  placeholder="Select Cluster ID"
                  value={clusterId}
                  onChange={(e) =>
                    handleFieldChange(
                      setClusterIds,
                      clusterIds,
                      index,
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">Select Cluster ID</option>
                  {allClusters.map((cluster, idx) => (
                    <option key={idx} value={cluster}>
                      {cluster}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          ))}
          {/* <Button
            variant="outline-primary"
            onClick={() => handleAddField(setClusterIds, clusterIds)}
          >
            Add Cluster ID
          </Button> */}
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Job
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>

      {/* Display submitted data */}
      <div className="submitted-data">
        <h3>Submitted Jobs</h3>
        <ul>
          {submittedData.map((data, index) => (
            <li key={index}>
              <strong>Job {index + 1}:</strong> {JSON.stringify(data)}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default VForm;

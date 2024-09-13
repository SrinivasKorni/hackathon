import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

function VForm({ onNewTask }) {
  // Validation schema using yup
  const schema = yup.object().shape({
    taskname: yup.string().required("Task name is required"),
    clusterid: yup.string().required("Cluster ID is required"),
    key: yup.string(),
    value: yup.string(),
  });

  // Function to handle form submission
  const handleFormSubmit = (values, { resetForm }) => {
    const taskData = {
      taskname: values.taskname,
      clusterid: values.clusterid,
      key: values.key,
      value: values.value,
    };

    // Pass formatted task data (JSON) to parent component
    onNewTask(taskData);

    // Reset the form after submission
    resetForm();
  };

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={handleFormSubmit}
        initialValues={{
          taskname: "",
          clusterid: "",
          key: "",
          value: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik101"
                className="position-relative"
              >
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="taskname"
                  placeholder="Task Name"
                  value={values.taskname}
                  onChange={handleChange}
                  isInvalid={touched.taskname && !!errors.taskname}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.taskname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationFormikClusterID">
                <Form.Label>Cluster ID</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Cluster ID"
                    name="clusterid"
                    value={values.clusterid}
                    onChange={handleChange}
                    isInvalid={touched.clusterid && !!errors.clusterid}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.clusterid}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="3"
                controlId="validationFormikKey"
                className="position-relative"
              >
                <Form.Label>Key</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Key"
                  name="key"
                  value={values.key}
                  onChange={handleChange}
                  isInvalid={touched.key && !!errors.key}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.key}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md="3"
                controlId="validationFormikValue"
                className="position-relative"
              >
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Value"
                  name="value"
                  value={values.value}
                  onChange={handleChange}
                  isInvalid={touched.value && !!errors.value}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.value}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit">Submit Task</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default VForm;

import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
// import fs from "fs";
// import path from "path";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadPath, setUploadPath] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mystyle = {
    margin: "5%",
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    // const downloadsDir = path.join(__dirname, "downloads");
    // if (!fs.existsSync(downloadsDir)) {
    //   fs.mkdirSync(downloadsDir);
    // }

    // const localFilePath = path.join(downloadsDir, file.name);
    // fs.copyFileSync(file.path, localFilePath);

    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("local_path", localFilePath);
    // formData.append("upload_path", uploadPath);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/workspace/upload",
        {
          local_path: {
            cells: [
              {
                cell_type: "code",
                execution_count: null,
                metadata: {},
                outputs: [],
                source: ['print("Hello kollollll")'],
              },
            ],
            metadata: {
              language_info: {
                name: "python",
              },
            },
            nbformat: 4,
            nbformat_minor: 2,
          },
          upload_path: uploadPath,
        },
        // C:\Users\korni\OneDrive\Desktop\hackathon\src\utils\New Text Document.ipynb
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("File uploaded successfully!");
        setError("");
        setFile(null);
        setUploadPath("");
        handleClose();
      } else {
        setError("Failed to upload file.");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 422) {
        setError("Invalid input. Please check your data.");
      } else {
        setError("Failed to upload file. Please try again.");
      }
    }
  };

  return (
    <>
      <Button style={mystyle} variant="primary" onClick={handleShow}>
        Upload
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter upload path"
            value={uploadPath}
            onChange={(e) => setUploadPath(e.target.value)}
          />
          <br />
          <br />
          <input type="file" onChange={handleChange} />
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Upload;

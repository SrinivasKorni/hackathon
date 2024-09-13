import React, { useState } from "react";
import { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import SplitPane from "split-pane-react/esm/SplitPane";
import Upload from "../utils/Upload";
import PipeLine from "../utils/PipeLine";
import "./Pane.css";
import AI from "../utils/AI";

const Divide = () => {
  const tag=<h1>Welcome to Automate-Databricks</h1>
  const [sizes, setSizes] = useState([100, 400]); // Initial sizes of panes
  const [content, setContent] = useState(tag);
  const handleButtonClick = (Component) => {
    setContent(<Component />);
  };

  return (
    <div style={{ height: "90vh" }}>
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        minSize={100}
        maxSize={600}
      >
        <Pane minSize={250} maxSize={400}>
          <div className="button-container">
            <button 
              className="styled-button"
              onClick={() => handleButtonClick(Upload)}
            >
              Upload
            </button>
            <button
              className="styled-button"
              onClick={() => handleButtonClick(PipeLine)}
            >
              PipeLine
            </button>
            <button
              className="styled-button"
              onClick={() => handleButtonClick(AI)}
            >
              AI
            </button>
          </div>
        </Pane>
        <Pane minSize={100}>
          <div style={{ padding: "20px",height:"650px", backgroundColor: "#e9ecef" }}>
            {content}
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
};

export default Divide;

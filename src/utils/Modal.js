import Accordion from "react-bootstrap/Accordion";

function FlushExample({ obj, headerText = "Accordion Item" }) {
  return (
    <div>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{headerText}</Accordion.Header>
          <Accordion.Body>
            {Object.entries(obj).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br />
    </div>
  );
}

export default FlushExample;

import React, { useState } from "react";

function AI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatbotStyles = {
    chatbot: {
      display: "flex",
      flexDirection: "column",
      height: "85vh", // Full viewport height
      justifyContent: "flex-end", // Aligns chatbox to the bottom
      backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      margin: "0 auto",
      padding: "10px",
    },
    chatbox: {
      display: "flex",
      flexDirection: "column",
      height: "auto", // Full height of the parent container
    },
    messages: {
      maxHeight: "390px",
      overflowY: "scroll",
      flexGrow: 10, // Allows messages area to grow and fill available space
    },
    message: {
      marginBottom: "10px",
    },
    botMessage: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "5px 10px",
      borderRadius: "5px",
      marginLeft: "auto",
    },
    userMessage: {
      backgroundColor: "#e0e0e0",
      padding: "5px 10px",
      borderRadius: "5px",
      marginRight: "auto",
    },
    input: {
      width: "100%",
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginBottom: "10px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    // api callto the backend
    if (input.trim()) {
      setMessages([...messages, { role: "user", text: input }]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        setMessages([...messages, { role: "user", text: input }, { role: "bot", text: "This is a bot response" }]);
      }, 1000);
    }
  };

  return (
    <div style={chatbotStyles.chatbot}>
      <div style={chatbotStyles.chatbox}>
        <div style={chatbotStyles.messages}>
          {messages.map((message, index) => (
            <div key={index} style={chatbotStyles.message}>
              {message.role === "bot" ? (
                <div style={chatbotStyles.botMessage}>{message.text}</div>
              ) : (
                <div style={chatbotStyles.userMessage}>{message.text}</div>
              )}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={chatbotStyles.input}
        />
        <button onClick={handleSendMessage} style={chatbotStyles.button}>Send</button>
      </div>
    </div>
  );
}

export default AI;

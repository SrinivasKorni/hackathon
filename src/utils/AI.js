import React, { useState } from "react";
import ai from '../logos/ai.png';
import recv from '../logos/speech-bubble.png';

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
      flexGrow: 1, // Allows messages area to grow and fill available space
    },
    messageContainer: {
      display: "flex",
      alignItems: "flex-end",
      marginBottom: "10px",
    },
    message: {
      padding: "5px 10px",
      borderRadius: "5px",
      maxWidth: "60%",
      display: "flex",
      alignItems: "center",
    },
    botMessage: {
      backgroundColor: "#007bff",
      color: "white",
      marginLeft: "10px",
      marginRight: "auto",
    },
    userMessage: {
      backgroundColor: "#e0e0e0",
      marginRight: "10px",
      marginLeft: "auto",
    },
    icon: {
      width: "24px",
      height: "24px",
      margin: "0 8px",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
    },
    input: {
      flex: 1,
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      width: "60px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
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
            <div key={index} style={chatbotStyles.messageContainer}>
              {message.role === "bot" ? (
                <>
                  <img
                    src={ai}
                    alt="Receiver Icon"
                    style={chatbotStyles.icon}
                  />
                  <div style={{ ...chatbotStyles.message, ...chatbotStyles.botMessage }}>
                    {message.text}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ ...chatbotStyles.message, ...chatbotStyles.userMessage }}>
                    {message.text}
                  </div>
                  <img
                    src= {recv}
                    alt="Sender Icon"
                    style={chatbotStyles.icon}
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div style={chatbotStyles.inputContainer}>
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
    </div>
  );
}

export default AI;

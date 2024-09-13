import React, { useState } from "react";
import ai from "../logos/ai.png";
import recv from "../logos/user.png";
import upload from '../logos/upload.png';

function AI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

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
    sendIcon: {
      width: "30px", // Adjust size as needed
      height: "30px", // Adjust size as needed
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "8px",
    },
    loadingIndicator: {
      margin: "10px",
      fontStyle: "italic",
      color: "#007bff",
    },
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", text: input }]);
      setInput("");
      setLoading(true); // Show loading indicator

      try {
        // Simulate an API request with a delay
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve("This is a bot response"), 1000)
        );
        setMessages([
          ...messages,
          { role: "user", text: input },
          { role: "bot", text: response },
        ]);
      } catch (error) {
        console.error("Error fetching bot response:", error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
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
                  <div
                    style={{
                      ...chatbotStyles.message,
                      ...chatbotStyles.botMessage,
                    }}
                  >
                    {message.text}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      ...chatbotStyles.message,
                      ...chatbotStyles.userMessage,
                    }}
                  >
                    {message.text}
                  </div>
                  <img
                    src={recv}
                    alt="Sender Icon"
                    style={chatbotStyles.icon}
                  />
                </>
              )}
            </div>
          ))}
          {loading && <div style={chatbotStyles.loadingIndicator}>Typing...</div>}
        </div>
        <div style={chatbotStyles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            style={chatbotStyles.input}
          />
          <button onClick={handleSendMessage} style={chatbotStyles.sendIcon}>
            <img src={upload} alt="Send Icon" style={{ width: "20px", height: "20px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AI;

"use client"

import React, { useState } from 'react';

const Home: React.FC = () => {
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  const askTheAI = async () => {
    if (inputMessage.trim() === '') return; // Ignore empty messages

    try {
      // Make a POST request to the /api/openai endpoint
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputMessage }), // Send the 'query' in the request body
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();

      // Update message history with the user's input and AI response
      setMessageHistory((prevHistory) => [
        ...prevHistory,
        `User: ${inputMessage}`,
        `Assistant: ${data.response}`, // Assuming the response from the server has 'response' property
      ]);

      // Clear the input after asking the AI
      setInputMessage('');
    } catch (error) {
      console.error('Error making the API call:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full mx-auto p-6">
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md w-full">
          {/* Display the message history */}
          {messageHistory.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>

        <textarea
          className="w-full p-4 mb-4 rounded-lg shadow-md resize-none"
          rows={6}
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        ></textarea>

        <button
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={askTheAI}
        >
          Ask the AI
        </button>
      </div>
    </div>
  );
};

export default Home;

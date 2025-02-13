import React, { useState, useEffect } from 'react';
import './Chat.css';

const Chat = () => {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [input, setInput] = useState('');

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080');

        websocket.onopen = () => console.log("WebSocket Connected");

        websocket.onmessage = (event) => {
            setMessages(prev => {
                const newMessages = [...prev, event.data];
                localStorage.setItem('chatMessages', JSON.stringify(newMessages)); // Save to localStorage
                return newMessages;
            });
        };

        websocket.onerror = (error) => console.error("WebSocket Error:", error);

        websocket.onclose = (event) => {
            console.warn("WebSocket Closed:", event);
            setTimeout(() => {
                console.log("Reconnecting...");
                setWs(new WebSocket('ws://localhost:8080'));
            }, 3000);
        };

        setWs(websocket);
        return () => websocket.close();
    }, []);

    const sendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN && input.trim()) {
            ws.send(input);
            
            setMessages(prev => {
                const newMessages = [...prev, `You: ${input}`];
                localStorage.setItem('chatMessages', JSON.stringify(newMessages)); // Update localStorage
                return newMessages;
            });

            setInput('');
        } else {
            console.warn("WebSocket is not connected!");
        }
    };

   

    return (
        <div className="chat-container">
            <h2>Chat</h2>
            <div className="chat-box">
                {messages.slice(0, messages.length ).map((msg, index) => (
                    <div key={index} className="message">{msg}</div>
                ))}
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;

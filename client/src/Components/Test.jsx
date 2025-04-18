import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const Test = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/chat");
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,  // Auto-reconnect every 5 seconds
        });

        client.onConnect = () => {
            console.log("Connected to WebSocket!");
            setConnected(true);

            // Subscribe to the topic for group messages
            // client.subscribe("/topic/messages", (msg) => {
            //     const receivedMessage = JSON.parse(msg.body);
            //     setMessages((prev) => [...prev, receivedMessage]);
            // });

            // Subscribe to private messages ("/user/queue/reply")
            client.subscribe("/user/queue/reply", (msg) => {
                const receivedMessage = JSON.parse(msg.body);
                setMessages((prev) => [...prev, receivedMessage]);
            });
        };

        client.onDisconnect = () => {
            console.log("Disconnected from WebSocket.");
            setConnected(false);
        };

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

    const sendMessage = () => {
        if (stompClient && message.trim()) {
            const chatMessage = {
                senderId: "user1",
                receiverId: "user2",
                content: message,
            };
            stompClient.publish({ destination: "/app/sendMessage", body: JSON.stringify(chatMessage) });
            setMessage("");
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto border rounded shadow">
            <h2 className="text-xl font-bold mb-4">WebSocket Chat</h2>

            {connected ? (
                <p className="text-green-600">🟢 Connected</p>
            ) : (
                <p className="text-red-600">🔴 Disconnected</p>
            )}

            <div className="border p-2 h-48 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                    <p key={index} className="border-b p-1">
                        <strong>{msg.senderId}:</strong> {msg.content}
                    </p>
                ))}
            </div>

            <input
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
                Send
            </button>
        </div>
    );
};

export default Test;
